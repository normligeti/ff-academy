import { createFeature, createReducer, on } from '@ngrx/store';
import { ProfileActions } from './profile.actions';

export const profileFeatureKey = 'profile';

export interface ProfileState {
    profile: any | null;
    error: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isLoaded: boolean;
}
  
  const initialState: ProfileState = {
    profile: null,
    error: null,
    isAuthenticated: false,
    isLoading: false,
    isLoaded: false
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

    on(ProfileActions.loginSuccess, (state, { profile }) => ({
        ...state,
        profile,
        isAuthenticated: true,
        error: null
    })),
    on(ProfileActions.loginFailure, (state, { error }) => ({
        ...state,
        error,
        isAuthenticated: false
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
);

export const profileFeature = createFeature({
    name: profileFeatureKey,
    reducer,
});

