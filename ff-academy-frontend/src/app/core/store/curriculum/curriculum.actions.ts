import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CurriculumActions = createActionGroup({
    source: 'Curriculum',
    events: {
        // --- Pillars ---
        'Load Pillars': emptyProps(),
        'Load Pillars Success': props<{ pillars: any[] }>(),
        'Load Pillars Failure': props<{ error: any }>(),

        // --- Trainings for user ---
        'Load Trainings For User': emptyProps(),
        'Load Trainings For User Success': props<{ trainings: any[] }>(),
        'Load Trainings For User Failure': props<{ error: any }>(),

        // --- Selected Training (by ID) ---
        'Load Selected Training': props<{ trainingId: string }>(),
        'Load Selected Training Success': props<{ detail: any }>(),
        'Load Selected Training Failure': props<{ error: any }>(),

        // --- Selected Training (by Path, optional) ---
        'Load Selected Training By Path': props<{ path: string }>(),
        'Load Selected Training By Path Success': props<{ detail: any }>(),
        'Load Selected Training By Path Failure': props<{ error: any }>(),

        // --- Quiz (linked by trainingId) ---
        'Load Quiz': props<{ trainingId: string }>(),
        'Load Quiz Success': props<{ quiz: any }>(),
        'Load Quiz Failure': props<{ error: any }>(),
    }
});
