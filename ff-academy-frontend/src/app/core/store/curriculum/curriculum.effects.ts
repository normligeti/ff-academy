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

    loadDecoratedCurriculum$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CurriculumActions.loadDecoratedCurriculum),
            mergeMap(() =>
                this.curriculumService.getDecoratedCurriculum().pipe(
                    map(curr => CurriculumActions.loadDecoratedCurriculumSuccess({ curriculum: curr })),
                    catchError(error =>
                        of(CurriculumActions.loadDecoratedCurriculumFailure({ error }))
                    )
                )
            )
        )
    );

    // // --- Load Training Detail by ID ---
    // loadSelectedTraining$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(CurriculumActions.loadSelectedTraining),
    //         mergeMap(({ trainingId }) =>
    //             this.curriculumService.getTrainingById(trainingId).pipe(
    //                 map(detail => CurriculumActions.loadSelectedTrainingSuccess({ detail })),
    //                 catchError(error => of(CurriculumActions.loadSelectedTrainingFailure({ error })))
    //             )
    //         )
    //     )
    // );

    // // --- Load Training Detail by Path (optional) ---
    // loadSelectedTrainingByPath$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(CurriculumActions.loadSelectedTrainingByPath),
    //         mergeMap(({ path }) =>
    //             this.curriculumService.getTrainingByPath(path).pipe(
    //                 map(detail => CurriculumActions.loadSelectedTrainingByPathSuccess({ detail })),
    //                 catchError(error => of(CurriculumActions.loadSelectedTrainingByPathFailure({ error })))
    //             )
    //         )
    //     )
    // );

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
