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

        // --- Training Detail (by ID) ---
        'Load Training Detail': props<{ trainingId: string }>(),
        'Load Training Detail Success': props<{ detail: any }>(),
        'Load Training Detail Failure': props<{ error: any }>(),

        // --- Training Detail (by Path, optional) ---
        'Load Training Detail By Path': props<{ path: string }>(),
        'Load Training Detail By Path Success': props<{ detail: any }>(),
        'Load Training Detail By Path Failure': props<{ error: any }>(),

        // --- Quiz (linked by trainingId) ---
        'Load Quiz': props<{ trainingId: string }>(),
        'Load Quiz Success': props<{ quiz: any }>(),
        'Load Quiz Failure': props<{ error: any }>(),
    }
});
