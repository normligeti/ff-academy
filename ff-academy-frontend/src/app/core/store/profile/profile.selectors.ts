import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProfile from './profile.reducer';

export const selectProfileState = createFeatureSelector<fromProfile.ProfileState>(
    fromProfile.profileFeatureKey
);

export const getProfile = createSelector(
    selectProfileState,
    (state) => state.profile
);

export const selectError = createSelector(
    selectProfileState,
    (state) => state.error
);

export const selectIsAuthenticated = createSelector(
    selectProfileState,
    (state) => state.isAuthenticated
);