export type DifficultyKey = 'basic' | 'intermediate' | 'master';

export const DIFFICULTY_ORDER_TO_NAME: Record<number, DifficultyKey> = {
    1: 'basic',
    2: 'intermediate',
    3: 'master'
};

export const DIFFICULTY_NAME_TO_ORDER: Record<DifficultyKey, number> = {
    basic: 1,
    intermediate: 2,
    master: 3
};
