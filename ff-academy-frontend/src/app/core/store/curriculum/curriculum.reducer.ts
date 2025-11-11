import { createFeature, createReducer, on } from '@ngrx/store';
import { CurriculumActions } from './curriculum.actions';

export const curriculumFeatureKey = 'curriculum';

export interface CurriculumState {
    curriculum: any | null;
    loadingCurriculum: boolean;
    loadedCurriculum: boolean;
    curriculumError: any;

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
    curriculum: null,
    loadingCurriculum: false,
    loadedCurriculum: false,
    curriculumError: null,

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

    // Curriculum curriculum
    on(CurriculumActions.loadDecoratedCurriculum, state => ({
        ...state,
        loadingCurriculum: true,
        curriculumError: null
    })),
    
    on(CurriculumActions.loadDecoratedCurriculumSuccess, (state, { curriculum }) => ({
        ...state,
        loadingCurriculum: false,
        loadedCurriculum: true,
        curriculum: curriculum
    })),
    
    on(CurriculumActions.loadDecoratedCurriculumFailure, (state, { error }) => ({
        ...state,
        loadingCurriculum: false,
        loadedCurriculum: false,
        curriculumError: error
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
