import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CurriculumService } from '../../services/curriculum.service';
import { CurriculumActions } from './curriculum.actions';

@Injectable()
export class CurriculumEffects {
    actions$ = inject(Actions);

    constructor(
        private curriculumService: CurriculumService
    ) {}

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

    loadDifficulties$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CurriculumActions.loadDifficulties),
            mergeMap(({ pillarOrder }) =>
                this.curriculumService.getDifficulties(pillarOrder).pipe(
                    map(difficulties => CurriculumActions.loadDifficultiesSuccess({ difficulties })),
                    catchError(error => of(CurriculumActions.loadDifficultiesFailure({ error })))
                )
            )
        )
    );

    loadAllDifficulties$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CurriculumActions.loadAllDifficulties),
            mergeMap(() =>
                this.curriculumService.getAllDifficulties().pipe(
                    map(difficulties => CurriculumActions.loadAllDifficultiesSuccess({ difficulties })),
                    catchError(error => of(CurriculumActions.loadAllDifficultiesFailure({ error })))
                )
            )
        )
    );

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

    loadTrainingDetail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CurriculumActions.loadTrainingDetail),
            mergeMap(({ pillarOrder, difficultyName, trainingOrder }) =>
                this.curriculumService.getTrainingDetail(pillarOrder, difficultyName, trainingOrder).pipe(
                    map(detail => CurriculumActions.loadTrainingDetailSuccess({ detail })),
                    catchError(error => of(CurriculumActions.loadTrainingDetailFailure({ error })))
                )
            )
        )
    );

    loadQuiz$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CurriculumActions.loadQuiz),
            mergeMap(({ pillarOrder, difficultyName, trainingOrder }) =>
                this.curriculumService.getQuiz(pillarOrder, difficultyName, trainingOrder).pipe(
                    map(quiz => CurriculumActions.loadQuizSuccess({ quiz })),
                    catchError(error => of(CurriculumActions.loadQuizFailure({ error })))
                )
            )
        )
    );
}
