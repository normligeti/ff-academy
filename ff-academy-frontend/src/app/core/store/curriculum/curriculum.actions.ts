import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CurriculumActions = createActionGroup({
    source: 'Curriculum',
    events: {
        // Load full decorated curriculum
        'Load Decorated Curriculum': emptyProps(),
        'Load Decorated Curriculum Success': props<{ curriculum: any }>(),
        'Load Decorated Curriculum Failure': props<{ error: any }>(),

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

        'Validate Quiz': props<{ trainingInfo: Object; answers: Record<number, number> }>(),
        'Validate Quiz Success': props<{ result: any }>(),
        'Validate Quiz Failure': props<{ error: any }>(),
    }
});
