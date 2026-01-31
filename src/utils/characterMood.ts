import type { CharacterMood, TimerStatus, TimerPhase } from '../types';

export const getCharacterMood = (
    status: TimerStatus,
    phase: TimerPhase,
    timeLeft: number
): CharacterMood => {
    if (status === 'completed') {
        return 'celebrating';
    }

    if (status === 'running') {
        if (phase === 'work') {
            return 'focused';
        } else {
            return 'happy'; // Break time
        }
    }

    if (status === 'paused') {
        return 'sleepy';
    }

    // Idle state
    return 'idle';
};
