import { createFeature, createReducer, on } from '@ngrx/store';
import { ProfileActions } from './profile.actions';

export const profileFeatureKey = 'profile';

export interface ProfileState {
    profile: any | null;
    error: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    // userProgress: any[];
    // savingProgress: boolean;
    // progressError: any;
}
  
  const initialState: ProfileState = {
    profile: null,
    error: null,
    isAuthenticated: false,
    isLoading: false,
    isLoaded: false,
    // userProgress: [],
    // savingProgress: false,
    // progressError: null,
};
  
export const reducer = createReducer(
    initialState,

    on(ProfileActions.loadProfile, (state) => ({
        ...state,
        isLoading: true,
        isLoaded: false,
        error: null
    })),
    on(ProfileActions.loadProfileSuccess, (state, { profile }) => ({
        ...state,
        profile,
        isAuthenticated: true,
        isLoading: false,
        isLoaded: true
    })),
    on(ProfileActions.loadProfileFailure, (state, { error }) => ({
        ...state,
        error,
        isAuthenticated: false,
        isLoading: false,
        isLoaded: false
    })),

    on(ProfileActions.login, (state) => ({
        ...state,
        isLoading: true,
        isLoaded: false,
        error: null
    })),
    on(ProfileActions.loginSuccess, (state) => ({
        ...state,
        isLoading: false,
        isLoaded: false,
        error: null
    })),
    on(ProfileActions.loginFailure, (state, { error }) => ({
        ...state,
        isAuthenticated: false,
        isLoading: false,
        isLoaded: false,
        error
    })),

    on(ProfileActions.logout, (state) => ({
        ...state,
        isLoading: true
    })),
    on(ProfileActions.logoutSuccess, () => ({
        ...initialState
    })),
    on(ProfileActions.logoutFailure, (state, { error }) => ({
        ...initialState,
        error
    })),

    // --- PROGRESS ---
    // on(ProfileActions.saveProgress, (state) => ({
    //     ...state,
    //     savingProgress: true,
    //     progressError: null
    // })),
    // on(ProfileActions.saveProgressSuccess, (state, { updatedProgress }) => ({
    //     ...state,
    //     savingProgress: false,
    //     userProgress: updatedProgress
    // })),
    // on(ProfileActions.saveProgressFailure, (state, { error }) => ({
    //     ...state,
    //     savingProgress: false,
    //     progressError: error
    // })),

    on(ProfileActions.updatePreferredLanguageSuccess, (state, { lang }) => ({
        ...state,
        profile: {
            ...state.profile,
            preferredLanguage: lang
        }
    })),
);

export const profileFeature = createFeature({
    name: profileFeatureKey,
    reducer,
});

