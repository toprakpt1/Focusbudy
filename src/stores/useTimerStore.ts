import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { TimerPhase, TimerStatus } from '../types';
import { useSettingsStore } from './useSettingsStore';

interface TimerStore {
    timeLeft: number;
    totalTime: number;
    phase: TimerPhase;
    status: TimerStatus;
    sessionsCompleted: number;
    startTimestamp: number | null;

    start: () => void;
    pause: () => void;
    resume: () => void;
    reset: () => void;
    tick: () => void;
    complete: () => void;
    setPhase: (phase: TimerPhase) => void;
    syncTimer: () => void;
}

const SHORT_BREAK = 5 * 60;    // 5 minutes
const LONG_BREAK = 15 * 60;    // 15 minutes
const SESSIONS_UNTIL_LONG_BREAK = 4;

// Settings store'dan odak suresini al
const getWorkDuration = () => {
    const focusDuration = useSettingsStore.getState().focusDuration;
    return Math.round(focusDuration * 60);
};

export const useTimerStore = create<TimerStore>()(
    persist(
        (set, get) => ({
            timeLeft: 25 * 60, // Default 25 min
            totalTime: 25 * 60,
            phase: 'work',
            status: 'idle',
            sessionsCompleted: 0,
            startTimestamp: null,

            start: () => {
                const now = Date.now();
                set({
                    status: 'running',
                    startTimestamp: now,
                });
            },

            pause: () => {
                set({ status: 'paused' });
            },

            resume: () => {
                const { timeLeft, totalTime } = get();
                // Keep remaining time: startTimestamp so that elapsed = (totalTime - timeLeft)
                const elapsedSeconds = totalTime - timeLeft;
                const startTimestamp = Date.now() - elapsedSeconds * 1000;
                set({
                    status: 'running',
                    startTimestamp,
                });
            },

            reset: () => {
                const { phase } = get();
                const workDuration = getWorkDuration();
                const duration = phase === 'work'
                    ? workDuration
                    : phase === 'shortBreak'
                        ? SHORT_BREAK
                        : LONG_BREAK;

                set({
                    timeLeft: duration,
                    totalTime: duration,
                    status: 'idle',
                    startTimestamp: null,
                });
            },

            tick: () => {
                set((state) => {
                    if (state.status !== 'running' || state.startTimestamp == null) return state;
                    // Elapsed-based countdown: avoids double-tick when React runs effects twice (e.g. Strict Mode)
                    const elapsed = Math.floor((Date.now() - state.startTimestamp) / 1000);
                    const newTimeLeft = Math.max(0, state.totalTime - elapsed);
                    if (newTimeLeft === 0) {
                        get().complete();
                    }
                    return { timeLeft: newTimeLeft };
                });
            },

            complete: () => {
                const { phase, sessionsCompleted } = get();
                const workDuration = getWorkDuration();

                if (phase === 'work') {
                    const newSessionsCompleted = sessionsCompleted + 1;
                    const nextPhase: TimerPhase =
                        newSessionsCompleted % SESSIONS_UNTIL_LONG_BREAK === 0
                            ? 'longBreak'
                            : 'shortBreak';

                    const nextDuration = nextPhase === 'longBreak' ? LONG_BREAK : SHORT_BREAK;

                    set({
                        status: 'completed',
                        sessionsCompleted: newSessionsCompleted,
                        phase: nextPhase,
                        timeLeft: nextDuration,
                        totalTime: nextDuration,
                    });
                } else {
                    // Break completed, back to work
                    const workDuration = getWorkDuration();
                    set({
                        status: 'completed',
                        phase: 'work',
                        timeLeft: workDuration,
                        totalTime: workDuration,
                    });
                }
            },

            setPhase: (phase: TimerPhase) => {
                const workDuration = getWorkDuration();
                const duration = phase === 'work'
                    ? workDuration
                    : phase === 'shortBreak'
                        ? SHORT_BREAK
                        : LONG_BREAK;

                set({
                    phase,
                    timeLeft: duration,
                    totalTime: duration,
                    status: 'idle',
                });
            },

            syncTimer: () => {
                // Called on app mount to account for time passed while backgrounded/closed
                const { status, startTimestamp, timeLeft, phase } = get();
                const workDuration = getWorkDuration();

                let newTimeLeft = timeLeft;
                if (status === 'running' && startTimestamp) {
                    const elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
                    newTimeLeft = Math.max(0, timeLeft - elapsed);
                }

                // If idle and in work phase, update to current work duration
                const finalTimeLeft = (status === 'idle' && phase === 'work') ? workDuration : newTimeLeft;
                const finalTotalTime = (status === 'idle' && phase === 'work') ? workDuration : get().totalTime;

                set({
                    status: finalTimeLeft > 0 ? 'paused' : 'idle',
                    timeLeft: finalTimeLeft,
                    totalTime: finalTotalTime,
                    startTimestamp: null,
                });
            },
        }),
        {
            name: 'timer-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
