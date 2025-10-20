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


export interface AppState {
    [profileFeature.name]: ProfileState;
}

export const reducers: ActionReducerMap<AppState> = {
    [profileFeature.name]: profileFeature.reducer,
};

export const effects: Array<any> = [
    ProfileEffects,
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
