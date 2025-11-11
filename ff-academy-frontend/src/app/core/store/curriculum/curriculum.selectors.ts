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
    selectTrainingsForDifficulty: (
        pillarOrder: number,
        difficultyName: string
    ) => createSelector(
        selectCurriculumState,
        (state) => {
            const trainings = state.trainings;
                const diffMap: Record<string, number> = {
                    basic: 1,
                    intermediate: 2,
                    master: 3
                };
        
                const difficultyOrder = diffMap[difficultyName];
    
            return trainings.filter(t => {
                const [pOrder, dOrder] = t.path.split('.').map(Number);
                return pOrder === pillarOrder && dOrder === difficultyOrder;
            });
        }
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