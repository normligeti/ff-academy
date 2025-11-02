import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurriculumState } from './curriculum.reducer';

const selectCurriculumState = createFeatureSelector<CurriculumState>('curriculum');

const selectPillars = createSelector(
    selectCurriculumState,
    state => state.pillars
);

const selectDifficulties = createSelector(
    selectCurriculumState,
    state => state.difficulties
);

const selectTrainings = createSelector(
    selectCurriculumState,
    state => state.trainings
);

const selectTrainingDetail = createSelector(
    selectCurriculumState,
    state => state.trainingDetail
);

const selectQuiz = createSelector(
    selectCurriculumState,
    state => state.quiz
);

const selectCurriculumLoading = createSelector(
    selectCurriculumState,
    state => state.loading
);

const selectLoadedPillars = createSelector(
    selectCurriculumState, 
    s => s.loadedPillars

);

const selectCurriculumError = createSelector(
    selectCurriculumState,
    state => state.error
);

export const CurriculumSelectors = {
    selectCurriculumState,
    selectPillars,
    selectDifficulties,
    selectTrainings,
    selectTrainingDetail,
    selectQuiz,
    selectCurriculumLoading,
    selectLoadedPillars,
    selectCurriculumError
};
