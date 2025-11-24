import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import { CurriculumSelectors } from '../../../core/store/curriculum/curriculum.selectors';
import { CurriculumActions } from '../../../core/store/curriculum/curriculum.actions';
import { combineLatest, map, Observable, skip, Subject, take, takeUntil } from 'rxjs';
import { ProfileActions } from '../../../core/store/profile/profile.actions';
import { Actions, ofType } from '@ngrx/effects';
import { DIFFICULTY_NAME_TO_ORDER } from '../../../core/utils/difficulty.enum';
import { ParamService } from '../../../core/services/param.service';

@Component({
  selector: 'app-quiz',
  imports: [RouterModule, CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
  providers: [ParamService],
  animations: [
    trigger('fadeInOut', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('0.1s 0.1s ease', style({ opacity: 1, }))
        ]),
        transition(':leave', [
            animate('0.1s ease', style({ opacity: 0 }))
        ])
    ]),
]
})


export class QuizComponent {
    private store = inject(Store);
    // trainingId!: string;
    // pillarOrder!: number;
    // difficultyName!: string;
    // difficultyOrder!: number;
    // facade: ParamService;

    validationError: boolean;

    destroy$ = new Subject<void>();
    
    // quiz$ = this.store.select(CurriculumSelectors.selectSelectedQuiz);
    quiz;
    training$: Observable<any>;

    // error$ = combineLatest([
    //     this.store.select(CurriculumSelectors.selectSelectedTrainingError),
    //     this.store.select(CurriculumSelectors.selectQuizError)
    // ]).pipe(
    //     map(([trainingError, quizError]) =>
    //         [trainingError, quizError].filter(Boolean)   // remove null/undefined
    //     )
    // );
    
    counter = 1;

    constructor(
        private route: ActivatedRoute,
        private actions$: Actions,
        private params: ParamService
    ) {}

    ngOnInit() {
        this.params.params$.subscribe(params => {
            
            this.store.select(CurriculumSelectors.selectCurriculumLoaded)
                .pipe(take(1))
                .subscribe(loaded => {
                    if (!loaded) {
                        this.store.dispatch(CurriculumActions.loadDecoratedCurriculum());
                    }
                }
            );

            this.training$ = this.store.select(
                CurriculumSelectors.selectTrainingDetails(
                    params.pillarOrder,
                    params.difficultyOrder,
                    params.trainingId
                )
            );

            this.training$.pipe(takeUntil(this.destroy$)).subscribe(training => {
                this.quiz = training?.quiz;
            });
        });

        // this.route.paramMap.subscribe(params => {
            // this.trainingId = String(params.get('trainingId'));
            // this.pillarOrder = Number(params.get('pillarOrder'));
            // this.difficultyName = params.get('difficultyName') || '';
            // this.difficultyOrder = DIFFICULTY_NAME_TO_ORDER[this.difficultyName];

            // this.store.select(CurriculumSelectors.selectCurriculumLoaded)
            //     .pipe(take(1))
            //     .subscribe(loaded => {
            //         if (!loaded) {
            //             this.store.dispatch(CurriculumActions.loadDecoratedCurriculum());
            //         }
            //     }
            // );

            // this.training$ = this.store.select(
            //     CurriculumSelectors.selectTrainingDetails(
            //         this.pillarOrder,
            //         this.difficultyOrder,
            //         this.trainingId
            //     )
            // );

            // this.training$.pipe(takeUntil(this.destroy$)).subscribe(training => {
            //     console.log('quiz detail component');
            //     console.log(training);
                
            //     this.quiz = training?.quiz;
            // });

            // // this.store.dispatch(
            // //     CurriculumActions.loadQuiz({
            // //         trainingId: this.trainingId
            // //     })
            // // );

            // // this.store.dispatch(
            // //     CurriculumActions.loadSelectedTraining({
            // //         trainingId: this.trainingId
            // //     })
            // // );
        // });

        this.actions$
            .pipe(
                ofType(CurriculumActions.validateQuizSuccess),
                takeUntil(this.destroy$)
            )
            .subscribe((response) => {
                this.success = response?.result?.quizSuccess;
                this.store.dispatch(CurriculumActions.loadDecoratedCurriculum());
            }
        );

        this.actions$
            .pipe(
                ofType(CurriculumActions.validateQuizFailure),
                takeUntil(this.destroy$)
            )
            .subscribe(err => {
                this.validationError = true;
                this.success = false;
                this.store.dispatch(CurriculumActions.loadDecoratedCurriculum());
            }
        );
    }


    // quiz stepper
    success: boolean | null = null; // null = not finished, true/false after last question
    selectedAnswers: Record<number, number> = {};
    fakeDownload = false;

    onSelect(questionId: number, answer: any) {
        this.selectedAnswers[questionId] = answer.answerId;
        console.log(this.selectedAnswers);
    }

    submit(questions: any[]) {
        if (this.counter === questions.length) {
            this.onQuizComplete();
        }
        this.counter++;
    }

    // TODO decide what to do when failing a new quiz and opening modified quiz
    // TODO move quiz validation to backend
    onQuizComplete() {
        this.training$.pipe(take(1)).subscribe(training => {
    
            const trainingInfo = {
                trainingId: training?._id,
                path: `${training?.path}`,
                status: training?.userProgress?.status,
                seenVersion: training?.version ?? 1
            };
    
            // this.store.dispatch(
            //     ProfileActions.saveProgress({
            //         userId: '68f027ed4ac1082b77d6d3c3',
            //         progressData: progress
            //     })
            // );

            this.store.dispatch(
                CurriculumActions.validateQuiz({
                    trainingInfo,
                    answers: this.selectedAnswers
                })
            );
        });
    }

    download() {
        this.success = null;
        this.fakeDownload = true;
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
