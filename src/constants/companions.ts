import type { CompanionType } from '../types';

export interface CompanionConfig {
    type: CompanionType;
    name: string;
    unlockLevel: number;
}

export const COMPANIONS: Array<CompanionConfig> = [
    { type: 'cat', name: 'Cat', unlockLevel: 0 },
    { type: 'dog', name: 'Dog', unlockLevel: 0 },
    { type: 'fox', name: 'Fox', unlockLevel: 2 },
    { type: 'rabbit', name: 'Rabbit', unlockLevel: 5 },
    { type: 'panda', name: 'Panda', unlockLevel: 10 },
    { type: 'owl', name: 'Owl', unlockLevel: 15 },
];
