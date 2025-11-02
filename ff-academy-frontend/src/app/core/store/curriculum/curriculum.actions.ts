import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CurriculumActions = createActionGroup({
  source: 'Curriculum',
  events: {
    // Pillars
    'Load Pillars': emptyProps(),
    'Load Pillars Success': props<{ pillars: any[] }>(),
    'Load Pillars Failure': props<{ error: any }>(),

    // Difficulties
    'Load Difficulties': props<{ pillarOrder: number }>(),
    'Load Difficulties Success': props<{ difficulties: any[] }>(),
    'Load Difficulties Failure': props<{ error: any }>(),

    'Load All Difficulties': emptyProps(),
    'Load All Difficulties Success': props<{ difficulties: any[] }>(),
    'Load All Difficulties Failure': props<{ error: any }>(),

    // Trainings
    'Load Trainings': props<{ pillarOrder: number; difficultyName: string }>(),
    'Load Trainings Success': props<{ trainings: any[] }>(),
    'Load Trainings Failure': props<{ error: any }>(),

    // Training Detail
    'Load Training Detail': props<{ pillarOrder: number; difficultyName: string; trainingOrder: number }>(),
    'Load Training Detail Success': props<{ detail: any }>(),
    'Load Training Detail Failure': props<{ error: any }>(),

    // Quiz
    'Load Quiz': props<{ pillarOrder: number; difficultyName: string; trainingOrder: number }>(),
    'Load Quiz Success': props<{ quiz: any }>(),
    'Load Quiz Failure': props<{ error: any }>(),
  }
});
