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

export const selectAuthLoading = createSelector(
    selectProfileState,
    state => state.isLoading
);

// --- PROGRESS ---
// export const selectUserProgress = createSelector(
//     selectProfileState,
//     (state) => state.userProgress
// );
// export const selectSavingProgress = createSelector(
//     selectProfileState,
//     (state) => state.savingProgress
// );
// export const selectProgressError = createSelector(
//     selectProfileState,
//     (state) => state.progressError
// );