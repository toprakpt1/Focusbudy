import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { TimerPhase, TimerStatus } from '../types';

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

const WORK_DURATION = 25 * 60; // 25 minutes
const SHORT_BREAK = 5 * 60;    // 5 minutes
const LONG_BREAK = 15 * 60;    // 15 minutes
const SESSIONS_UNTIL_LONG_BREAK = 4;

export const useTimerStore = create<TimerStore>()(
    persist(
        (set, get) => ({
            timeLeft: WORK_DURATION,
            totalTime: WORK_DURATION,
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
                const now = Date.now();
                set({
                    status: 'running',
                    startTimestamp: now,
                });
            },

            reset: () => {
                const { phase } = get();
                const duration = phase === 'work'
                    ? WORK_DURATION
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
                    if (state.status !== 'running') return state;

                    const newTimeLeft = Math.max(0, state.timeLeft - 1);

                    if (newTimeLeft === 0) {
                        get().complete();
                    }

                    return { timeLeft: newTimeLeft };
                });
            },

            complete: () => {
                const { phase, sessionsCompleted } = get();

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
                    set({
                        status: 'completed',
                        phase: 'work',
                        timeLeft: WORK_DURATION,
                        totalTime: WORK_DURATION,
                    });
                }
            },

            setPhase: (phase: TimerPhase) => {
                const duration = phase === 'work'
                    ? WORK_DURATION
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

                let newTimeLeft = timeLeft;
                if (status === 'running' && startTimestamp) {
                    const elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
                    newTimeLeft = Math.max(0, timeLeft - elapsed);
                }

                set({
                    status: newTimeLeft > 0 ? status : 'idle',
                    timeLeft: newTimeLeft,
                    startTimestamp: status === 'running' ? Date.now() : null,
                });
            },
        }),
        {
            name: 'timer-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
