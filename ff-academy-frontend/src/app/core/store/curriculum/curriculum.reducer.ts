import { createFeature, createReducer, on } from '@ngrx/store';
import { CurriculumActions } from './curriculum.actions';

export const curriculumFeatureKey = 'curriculum';

export interface CurriculumState {
    // Pillars
    pillars: any[];
    loadingPillars: boolean;
    loadedPillars: boolean;
    pillarsError: any;

    // Trainings
    trainings: any[];
    loadingTrainings: boolean;
    loadedTrainings: boolean;
    trainingsError: any;

    // Selected training
    selectedTraining: any | null;
    loadingSelectedTraining: boolean;
    loadedSelectedTraining: boolean;
    selectedTrainingError: any;

    // Selected quiz
    selectedQuiz: any | null;
    loadingQuiz: boolean;
    loadedQuiz: boolean;
    quizError: any;
}

export const initialState: CurriculumState = {
    // Pillars
    pillars: [],
    loadingPillars: false,
    loadedPillars: false,
    pillarsError: null,

    // Trainings
    trainings: [],
    loadingTrainings: false,
    loadedTrainings: false,
    trainingsError: null,

    // Training detail
    selectedTraining: null,
    loadingSelectedTraining: false,
    loadedSelectedTraining: false,
    selectedTrainingError: null,

    // Quiz
    selectedQuiz: null,
    loadingQuiz: false,
    loadedQuiz: false,
    quizError: null
};

export const reducer = createReducer(
    initialState,

    // --- PILLARS ---
    on(CurriculumActions.loadPillars, state => ({
        ...state,
        loadingPillars: true,
        loadedPillars: false,
        pillarsError: null
    })),
    on(CurriculumActions.loadPillarsSuccess, (state, { pillars }) => ({
        ...state,
        loadingPillars: false,
        loadedPillars: true,
        pillars
    })),
    on(CurriculumActions.loadPillarsFailure, (state, { error }) => ({
        ...state,
        loadingPillars: false,
        loadedPillars: false,
        pillarsError: error
    })),

    // --- TRAININGS ---
    on(CurriculumActions.loadTrainingsForUser, state => ({
        ...state,
        loadingTrainings: true,
        loadedTrainings: false,
        trainingsError: null
    })),
    on(CurriculumActions.loadTrainingsForUserSuccess, (state, { trainings }) => ({
        ...state,
        loadingTrainings: false,
        loadedTrainings: true,
        trainings
    })),
    on(CurriculumActions.loadTrainingsForUserFailure, (state, { error }) => ({
        ...state,
        loadingTrainings: false,
        loadedTrainings: false,
        trainingsError: error
    })),

    // --- TRAINING DETAILS ---
    on(CurriculumActions.loadSelectedTraining, state => ({
        ...state,
        loadingSelectedTraining: true,
        loadedSelectedTraining: false,
        selectedTrainingError: null
    })),
    on(CurriculumActions.loadSelectedTrainingSuccess, (state, { detail }) => ({
        ...state,
        loadingSelectedTraining: false,
        loadedSelectedTraining: true,
        selectedTraining: detail
    })),
    on(CurriculumActions.loadSelectedTrainingFailure, (state, { error }) => ({
        ...state,
        loadingSelectedTraining: false,
        loadedSelectedTraining: false,
        selectedTrainingError: error
    })),

    // --- QUIZ ---
    on(CurriculumActions.loadQuiz, state => ({
        ...state,
        loadingQuiz: true,
        loadedQuiz: false,
        quizError: null
    })),
    on(CurriculumActions.loadQuizSuccess, (state, { quiz }) => ({
        ...state,
        loadingQuiz: false,
        loadedQuiz: true,
        selectedQuiz: quiz
    })),
    on(CurriculumActions.loadQuizFailure, (state, { error }) => ({
        ...state,
        loadingQuiz: false,
        loadedQuiz: false,
        quizError: error
    }))
);

export const curriculumFeature = createFeature({
    name: curriculumFeatureKey,
    reducer
});
