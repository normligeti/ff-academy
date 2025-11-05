import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { CurriculumService } from '../../services/curriculum.service';
import { CurriculumActions } from './curriculum.actions';

@Injectable()
export class CurriculumEffects {
    actions$ = inject(Actions);

    constructor(private curriculumService: CurriculumService) {}

    // --- Load Pillars ---
    loadPillars$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CurriculumActions.loadPillars),
            mergeMap(() =>
                this.curriculumService.getPillars().pipe(
                    map(pillars => CurriculumActions.loadPillarsSuccess({ pillars })),
                    catchError(error => of(CurriculumActions.loadPillarsFailure({ error })))
                )
            )
        )
    );

    // --- Load Trainings for a difficulty ---
    loadTrainings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CurriculumActions.loadTrainings),
            mergeMap(({ pillarOrder, difficultyName }) =>
                this.curriculumService.getTrainings(pillarOrder, difficultyName).pipe(
                    map(trainings => CurriculumActions.loadTrainingsSuccess({ trainings })),
                    catchError(error => of(CurriculumActions.loadTrainingsFailure({ error })))
                )
            )
        )
    );

    // --- Load Training Detail by ID ---
    loadTrainingDetail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CurriculumActions.loadTrainingDetail),
            mergeMap(({ trainingId }) =>
                this.curriculumService.getTrainingById(trainingId).pipe(
                    map(detail => CurriculumActions.loadTrainingDetailSuccess({ detail })),
                    catchError(error => of(CurriculumActions.loadTrainingDetailFailure({ error })))
                )
            )
        )
    );

    // --- Load Training Detail by Path (optional) ---
    loadTrainingDetailByPath$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CurriculumActions.loadTrainingDetailByPath),
            mergeMap(({ path }) =>
                this.curriculumService.getTrainingByPath(path).pipe(
                    map(detail => CurriculumActions.loadTrainingDetailByPathSuccess({ detail })),
                    catchError(error => of(CurriculumActions.loadTrainingDetailByPathFailure({ error })))
                )
            )
        )
    );

    // --- Load Quiz by trainingId ---
    loadQuiz$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CurriculumActions.loadQuiz),
            mergeMap(({ trainingId }) =>
                this.curriculumService.getQuiz(trainingId).pipe(
                    map(quiz => CurriculumActions.loadQuizSuccess({ quiz })),
                    catchError(error => of(CurriculumActions.loadQuizFailure({ error })))
                )
            )
        )
    );
}
