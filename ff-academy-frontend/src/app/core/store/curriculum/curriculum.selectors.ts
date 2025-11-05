import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurriculumState } from './curriculum.reducer';
import { curriculumFeatureKey } from './curriculum.reducer';

// feature root
export const selectCurriculumState = createFeatureSelector<CurriculumState>(curriculumFeatureKey);

export const CurriculumSelectors = {
    // --- PILLARS ---
    selectPillars: createSelector(
        selectCurriculumState,
        (state) => state.pillars
    ),
    selectPillarsLoading: createSelector(
        selectCurriculumState,
        (state) => state.loadingPillars
    ),
    selectPillarsLoaded: createSelector(
        selectCurriculumState,
        (state) => state.loadedPillars
    ),
    selectPillarsError: createSelector(
        selectCurriculumState,
        (state) => state.pillarsError
    ),

    // --- TRAININGS ---
    selectTrainings: createSelector(
        selectCurriculumState,
        (state) => state.trainings
    ),
    selectTrainingsLoading: createSelector(
        selectCurriculumState,
        (state) => state.loadingTrainings
    ),
    selectTrainingsLoaded: createSelector(
        selectCurriculumState,
        (state) => state.loadedTrainings
    ),
    selectTrainingsError: createSelector(
        selectCurriculumState,
        (state) => state.trainingsError
    ),

    // --- TRAINING DETAIL ---
    selectSelectedTraining: createSelector(
        selectCurriculumState,
        (state) => state.selectedTraining
    ),
    selectTrainingDetailLoading: createSelector(
        selectCurriculumState,
        (state) => state.loadingTrainingDetail
    ),
    selectTrainingDetailLoaded: createSelector(
        selectCurriculumState,
        (state) => state.loadedTrainingDetail
    ),
    selectTrainingDetailError: createSelector(
        selectCurriculumState,
        (state) => state.trainingDetailError
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
