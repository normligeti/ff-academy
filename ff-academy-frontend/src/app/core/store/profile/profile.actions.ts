import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProfileActions = createActionGroup({
    source: 'Profile',
    events: {
        'Load Profile': emptyProps(),
        'Load Profile Success': props<{ profile: any }>(),
        'Load Profile Failure': props<{ error: any }>(),

        'Login': props<{ loginData: Object }>(),
        'Login Success': emptyProps(),
        'Login Failure': props<{ error: any }>(),

        'Logout': emptyProps(),
        'Logout Success': emptyProps(),
        'Logout Failure': props<{ error: any }>(),

        // --- Progress ---
        // 'Save Progress': props<{ userId: string; progressData: any }>(),
        // 'Save Progress Success': props<{ updatedProgress: any[] }>(),
        // 'Save Progress Failure': props<{ error: any }>(),

        'Update Preferred Language': props<{ lang: string }>(),
        'Update Preferred Language Success': props<{ lang: string }>(),
        'Update Preferred Language Failure': props<{ error: any }>(),

    }
});