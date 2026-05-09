import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserStats, CompanionType } from '../types';
import { COMPANIONS } from '../constants/companions';


interface DailyStats {
    count: number;
    duration: number; // in seconds
}

interface UserStore extends UserStats {
    history: Record<string, DailyStats>; // YYYY-MM-DD -> Stats
    addXP: (amount: number) => void;
    incrementStreak: () => void;
    resetStreak: () => void;
    addFocusTime: (seconds: number) => void;
    incrementSessionsToday: (sessionDuration: number) => void;
    setActiveCompanion: (companion: CompanionType) => void;
    addCurrency: (amount: number) => void;
    resetDailyStats: () => void;
    setLastSessionOutcome: (outcome: UserStats['lastSessionOutcome']) => void;
    clearLastSessionRewards: () => void;
}

const XP_PER_LEVEL = 100;
const XP_PER_SESSION = 25;
const CURRENCY_PER_SESSION = 10;

const getTodayString = () => new Date().toISOString().split('T')[0];

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            // Initial state
            xp: 0,
            level: 1,
            streak: 0,
            history: {},
            totalFocusTime: 0,
            sessionsToday: 0,
            currency: 0,
            activeCompanion: 'cat',
            lastSessionOutcome: 'none',
            unlockedCompanions: ['cat', 'dog'] as CompanionType[],
            lastSessionRewards: { leveledUp: false },

            addXP: (amount: number) => {
                set((state) => {
                    const newXP = state.xp + amount;
                    const xpForNextLevel = state.level * XP_PER_LEVEL;
                    let leveledUp = false;
                    let newLevel: number | undefined;
                    let unlockedCompanion: CompanionType | null = null;
                    const unlockedCompanions = [...(state.unlockedCompanions || ['cat', 'dog'])];

                    if (newXP >= xpForNextLevel) {
                        leveledUp = true;
                        const remainingXP = newXP - xpForNextLevel;
                        const currentNewLevel = state.level + 1;
                        newLevel = currentNewLevel;

                        // Check if any companion unlocks at this new level
                        for (const companion of COMPANIONS) {
                            if (companion.unlockLevel === currentNewLevel && !unlockedCompanions.includes(companion.type)) {
                                unlockedCompanion = companion.type;
                                unlockedCompanions.push(companion.type);
                                break;
                            }
                        }

                        return {
                            xp: remainingXP,
                            level: currentNewLevel,
                            unlockedCompanions,
                            lastSessionRewards: {
                                leveledUp,
                                newLevel,
                                unlockedCompanion,
                            },
                        };
                    }

                    return {
                        xp: newXP,
                        lastSessionRewards: {
                            leveledUp,
                            newLevel,
                            unlockedCompanion,
                        },
                    };
                });
            },

            incrementStreak: () => {
                set((state) => {
                    const newStreak = state.streak + 1;
                    return { streak: newStreak };
                });
            },

            resetStreak: () => {
                set({ streak: 0 });
            },

            addFocusTime: (seconds: number) => {
                set((state) => {
                    const newTotal = state.totalFocusTime + seconds;
                    return { totalFocusTime: newTotal };
                });
            },

            incrementSessionsToday: (sessionDuration: number) => {
                set((state) => {
                    const today = getTodayString();
                    const currentHistory = state.history || {};
                    const todayStats = currentHistory[today] || { count: 0, duration: 0 };

                    const newCount = state.sessionsToday + 1;

                    // Update history
                    const newHistory = {
                        ...currentHistory,
                        [today]: {
                            count: todayStats.count + 1,
                            duration: todayStats.duration + sessionDuration
                        }
                    };

                    // Award XP and currency
                    get().addXP(XP_PER_SESSION);
                    get().addCurrency(CURRENCY_PER_SESSION);

                    return {
                        sessionsToday: newCount,
                        history: newHistory,
                        lastSessionOutcome: 'completed',
                    };
                });
            },

            setActiveCompanion: (companion: CompanionType) => {
                set({ activeCompanion: companion });
            },

            addCurrency: (amount: number) => {
                set((state) => {
                    const newCurrency = state.currency + amount;
                    return { currency: newCurrency };
                });
            },

            resetDailyStats: () => {
                set({ sessionsToday: 0 });
            },
            setLastSessionOutcome: (outcome) => {
                set({ lastSessionOutcome: outcome });
            },
            clearLastSessionRewards: () => {
                set({ lastSessionRewards: { leveledUp: false } });
            },
        }),
        {
            name: 'user-storage',
            version: 1,
            migrate: (persistedState: any, version) => {
                if (version === 0) {
                    const state = persistedState as any;
                    if (!state.unlockedCompanions) {
                        const level = state.level || 1;
                        const unlocked: CompanionType[] = ['cat', 'dog'];
                        for (const c of COMPANIONS) {
                            if (c.unlockLevel > 0 && c.unlockLevel <= level) {
                                unlocked.push(c.type);
                            }
                        }
                        state.unlockedCompanions = unlocked;
                    }
                    if (!state.lastSessionRewards) {
                        state.lastSessionRewards = { leveledUp: false };
                    }
                }
                return persistedState;
            },
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
