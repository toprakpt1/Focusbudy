import { useEffect } from 'react';
import { useTimerStore } from '../stores/useTimerStore';
import { useUserStore } from '../stores/useUserStore';

export const usePomodoro = () => {
    const timer = useTimerStore();
    const user = useUserStore();

    // Timer tick effect
    useEffect(() => {
        if (timer.status !== 'running') return;

        const interval = setInterval(() => {
            timer.tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [timer.status]);

    // Handle completion
    useEffect(() => {
        if (timer.status === 'completed' && timer.lastCompletedPhase === 'work') {
            // Work session completed - award XP and update stats
            user.incrementSessionsToday(timer.totalTime);
            user.addFocusTime(timer.totalTime);
        }
    }, [timer.status, timer.lastCompletedPhase, timer.totalTime]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getProgress = (): number => {
        return 1 - timer.timeLeft / timer.totalTime;
    };

    return {
        ...timer,
        formatTime,
        getProgress,
    };
};
