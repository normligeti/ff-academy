import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Load Profile': emptyProps(),
    'Load Profile Success': props<{ profile: any }>(),
    'Load Profile Failure': props<{ error: any }>(),

    'Login': props<{ loginData: Object }>(),
    'Login Success': props<{ profile: any }>(),
    'Login Failure': props<{ error: any }>(),

    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: any }>(),

    'Save Progress': props<{
        userId: string;
        progress: {
            pillarOrder: number;
            difficultyOrder: number;
            trainingOrder: number;
            completed?: boolean;
            failed?: boolean;
        };
    }>(),
    'Save Progress Success': props<{ progress: any[] }>(),
    'Save Progress Failure': props<{ error: any }>()
  }
});