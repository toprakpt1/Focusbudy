export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
};

export const getXPForNextLevel = (level: number): number => {
    return level * 100;
};

export const getLevelProgress = (xp: number, level: number): number => {
    const xpForNext = getXPForNextLevel(level);
    return xp / xpForNext;
};
