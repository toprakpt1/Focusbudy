import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserStats, CompanionType } from '../types';


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
    unlockCompanion: (companion: CompanionType) => void;
    spendCurrency: (amount: number) => boolean;
    addCurrency: (amount: number) => void;
    resetDailyStats: () => void;
    // loadFromStorage removed as valid persist middleware handles rehydration
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
            unlockedCompanions: ['cat', 'dog'],

            addXP: (amount: number) => {
                set((state) => {
                    const newXP = state.xp + amount;
                    const xpForNextLevel = state.level * XP_PER_LEVEL;

                    if (newXP >= xpForNextLevel) {
                        // Level up!
                        const remainingXP = newXP - xpForNextLevel;
                        const newLevel = state.level + 1;
                        return { xp: remainingXP, level: newLevel };
                    }

                    return { xp: newXP };
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
                        history: newHistory
                    };
                });
            },

            setActiveCompanion: (companion: CompanionType) => {
                set({ activeCompanion: companion });
            },

            unlockCompanion: (companion: CompanionType) => {
                set((state) => {
                    // Check if already unlocked to prevent duplicates (Fixes unique key error)
                    if (state.unlockedCompanions.includes(companion)) {
                        return state;
                    }
                    const newUnlocked = Array.from(new Set([...state.unlockedCompanions, companion]));
                    return { unlockedCompanions: newUnlocked };
                });
            },

            spendCurrency: (amount: number) => {
                const current = get().currency;
                if (current < amount) return false;
                set({ currency: current - amount });
                return true;
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
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
