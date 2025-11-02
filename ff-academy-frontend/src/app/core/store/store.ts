import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { profileFeature, ProfileState } from './profile/profile.reducer';
import { ProfileEffects } from './profile/profile.effects';
import { curriculumFeature, CurriculumState } from './curriculum/curriculum.reducer';
import { CurriculumEffects } from './curriculum/curriculum.effects';


export interface AppState {
    [profileFeature.name]: ProfileState;
    [curriculumFeature.name]: CurriculumState;
}

export const reducers: ActionReducerMap<AppState> = {
    [profileFeature.name]: profileFeature.reducer,
    [curriculumFeature.name]: curriculumFeature.reducer,
};

export const effects: Array<any> = [
    ProfileEffects,
    CurriculumEffects,
]

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return (state: AppState | undefined, action: any): any => {
        const result = reducer(state, action);
        console.group(action.type);
        console.log('prev state', state);
        console.log('action', action);
        console.log('next state', result);
        console.groupEnd();
    
        return result;
    };
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [logger] : [];
