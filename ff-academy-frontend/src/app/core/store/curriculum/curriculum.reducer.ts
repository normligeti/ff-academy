import { createFeature, createReducer, on } from '@ngrx/store';
import { CurriculumActions } from './curriculum.actions';

export const curriculumFeatureKey = 'curriculum';

export interface CurriculumState {
    pillars: any[];
    difficulties: any[];
    trainings: any[];
    trainingDetail: any | null;
    quiz: any | null;
    loading: boolean;
    loadedPillars: boolean;
    error: any;
}

export const initialState: CurriculumState = {
    pillars: [],
    difficulties: [],
    trainings: [],
    trainingDetail: null,
    quiz: null,
    loading: false,
    loadedPillars: false,
    error: null
};

export const reducer = createReducer(
    initialState,

    // Pillars
    on(CurriculumActions.loadPillars, state => ({ ...state, loading: true, error: null })),
    on(CurriculumActions.loadPillarsSuccess, (state, { pillars }) => ({ ...state, loading: false, loadedPillars: true, pillars })),
    on(CurriculumActions.loadPillarsFailure, (state, { error }) => ({ ...state, loading: false, loadedPillars: false, error })),

    // Difficulties
    on(CurriculumActions.loadDifficulties, state => ({ ...state, loading: true, error: null })),
    on(CurriculumActions.loadDifficultiesSuccess, (state, { difficulties }) => ({ ...state, loading: false, difficulties })),
    on(CurriculumActions.loadDifficultiesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CurriculumActions.loadAllDifficulties, state => ({ ...state, loading: true, error: null })),
    on(CurriculumActions.loadAllDifficultiesSuccess, (state, { difficulties }) => ({ ...state, loading: false, difficulties })),
    on(CurriculumActions.loadAllDifficultiesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Trainings
    on(CurriculumActions.loadTrainings, state => ({ ...state, loading: true, error: null })),
    on(CurriculumActions.loadTrainingsSuccess, (state, { trainings }) => ({ ...state, loading: false, trainings })),
    on(CurriculumActions.loadTrainingsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Training detail
    on(CurriculumActions.loadTrainingDetail, state => ({ ...state, loading: true, error: null })),
    on(CurriculumActions.loadTrainingDetailSuccess, (state, { detail }) => ({ ...state, loading: false, trainingDetail: detail })),
    on(CurriculumActions.loadTrainingDetailFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Quiz
    on(CurriculumActions.loadQuiz, state => ({ ...state, loading: true, error: null })),
    on(CurriculumActions.loadQuizSuccess, (state, { quiz }) => ({ ...state, loading: false, quiz })),
    on(CurriculumActions.loadQuizFailure, (state, { error }) => ({ ...state, loading: false, error })),
);

export const curriculumFeature = createFeature({
    name: curriculumFeatureKey,
    reducer,
});