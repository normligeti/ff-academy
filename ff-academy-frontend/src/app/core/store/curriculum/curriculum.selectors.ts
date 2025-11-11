import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurriculumState } from './curriculum.reducer';
import { curriculumFeatureKey } from './curriculum.reducer';

// feature root
export const selectCurriculumState = createFeatureSelector<CurriculumState>(curriculumFeatureKey);

export const CurriculumSelectors = {
    
    // --- BASE CURRICULUM ---
    selectCurriculum: createSelector(
        selectCurriculumState,
        state => state.curriculum
    ),
    selectCurriculumLoading: createSelector(
        selectCurriculumState,
        state => state.loadingCurriculum
    ),
    selectCurriculumLoaded: createSelector(
        selectCurriculumState,
        state => state.loadedCurriculum
    ),
    selectCurriculumError: createSelector(
        selectCurriculumState,
        state => state.curriculumError
    ),

    // --- PILLARS ---
    selectPillars: createSelector(
        selectCurriculumState,
        state => state.curriculum?.pillars ?? []
    ),
    selectPillar: (pillarOrder: number) =>
        createSelector(
            selectCurriculumState,
            state =>
                state.curriculum?.pillars?.find(
                    p => p.order === pillarOrder
                ) ?? null
    ),

    // --- DIFFICULTIES ---
    selectDifficulty: (pillarOrder: number, difficultyName: string) =>
        createSelector(
            selectCurriculumState,
            state => {
                const pillar = state.curriculum?.pillars?.find(
                    p => p.order === pillarOrder
                );
                return pillar?.difficulties?.find(
                    d => d.name === difficultyName
                ) ?? null;
            }
    ),

    // --- TRAININGS INSIDE DIFFICULTY ---
    selectTrainingsForDifficulty: (pillarOrder: number, difficultyName: string) =>
        createSelector(
            selectCurriculumState,
            state => {
                const pillar = state.curriculum?.pillars?.find(
                    p => p.order === pillarOrder
                );
                if (!pillar) return [];

                const difficulty = pillar.difficulties?.find(
                    d => d.name === difficultyName
                );
                return difficulty?.trainings ?? [];
            }
    ),

    // --- TRAINING DETAIL ---
    selectSelectedTraining: createSelector(
        selectCurriculumState,
        (state) => state.selectedTraining
    ),
    selectSelectedTrainingLoading: createSelector(
        selectCurriculumState,
        (state) => state.loadingSelectedTraining
    ),
    selectSelectedTrainingLoaded: createSelector(
        selectCurriculumState,
        (state) => state.loadedSelectedTraining
    ),
    selectSelectedTrainingError: createSelector(
        selectCurriculumState,
        (state) => state.selectedTrainingError
    ),

    // --- QUIZ ---
    selectSelectedQuiz: createSelector(
        selectCurriculumState,
        (state) => state.selectedQuiz
    ),
    selectQuizLoading: createSelector(
        selectCurriculumState,
        (state) => state.loadingQuiz
    ),
    selectQuizLoaded: createSelector(
        selectCurriculumState,
        (state) => state.loadedQuiz
    ),
    selectQuizError: createSelector(
        selectCurriculumState,
        (state) => state.quizError
    )
};