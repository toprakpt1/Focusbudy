import type { CharacterMood, TimerStatus, UserStats } from '../types';

export const getCharacterMood = (
    status: TimerStatus,
    lastSessionOutcome: UserStats['lastSessionOutcome'],
    sessionsToday: number
): CharacterMood => {
    const SLEEPY_THRESHOLD = 8;

    if (lastSessionOutcome === 'abandoned') return 'sad';

    if (status === 'completed' || lastSessionOutcome === 'completed') {
        return sessionsToday >= SLEEPY_THRESHOLD ? 'sleepy' : 'happy';
    }

    return 'idle';
};
