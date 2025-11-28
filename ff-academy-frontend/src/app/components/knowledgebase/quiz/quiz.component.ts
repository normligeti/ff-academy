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
import { ParamService } from '../../../core/services/param.service';
import { DIFFICULTY_ORDER_TO_NAME } from '../../../core/utils/difficulty.enum';
import { LoaderComponent } from "../../loader/loader.component";

@Component({
  selector: 'app-quiz',
  imports: [RouterModule, CommonModule, MatCheckboxModule, FormsModule, LoaderComponent],
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
    isLoading = false;

    // error$ = combineLatest([
    //     this.store.select(CurriculumSelectors.selectSelectedTrainingError),
    //     this.store.select(CurriculumSelectors.selectQuizError)
    // ]).pipe(
    //     map(([trainingError, quizError]) =>
    //         [trainingError, quizError].filter(Boolean)   // remove null/undefined
    //     )
    // );

    certificateBlob;
    certificateUrl;
    
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
                console.log('training');
                console.log(training);
                
                this.quiz = training?.quiz;
            });
        });

        this.actions$
            .pipe(
                ofType(CurriculumActions.validateQuizSuccess),
                takeUntil(this.destroy$)
            )
            .subscribe((response) => {
                this.isLoading = false;
                this.counter++;
                this.success = response?.result?.quizSuccess;
                this.store.dispatch(CurriculumActions.loadDecoratedCurriculum());

                if (response.result?.quizSuccess && response.result?.certificateImage) {
                        const byteString = atob(response.result?.certificateImage);
                        const array = new Uint8Array(byteString.length);
                        for (let i = 0; i < byteString.length; i++) {
                        array[i] = byteString.charCodeAt(i);
                        }
                    
                        this.certificateBlob = new Blob([array], { type: 'image/png' });
                        this.certificateUrl = URL.createObjectURL(this.certificateBlob);
                  }
            }
        );

        this.actions$
            .pipe(
                ofType(CurriculumActions.validateQuizFailure),
                takeUntil(this.destroy$)
            )
            .subscribe(err => {
                this.isLoading = false;
                this.counter++;
                this.validationError = true;
                this.success = false;
                this.store.dispatch(CurriculumActions.loadDecoratedCurriculum());
            }
        );
    }


    // quiz stepper
    success: boolean | null = null; // null = not finished, true/false after last question
    selectedAnswers: Record<number, number> = {};
    showCert = false;

    onSelect(questionId: number, answer: any) {
        this.selectedAnswers[questionId] = answer.answerId;
        console.log(this.selectedAnswers);
    }

    submit(questions: any[]) {
        if (this.counter === questions.length) {
            this.onQuizComplete();
        } else {
            this.counter++;
        }
    }

    // TODO decide what to do when opening modified quiz
    onQuizComplete() {
        combineLatest([
            this.training$.pipe(take(1)),
            this.store.select(CurriculumSelectors.selectPillars).pipe(take(1))
        ])
        .subscribe(([training, pillars]) => {
      
            const pillar = pillars.find(p => p.order === training?.pillarOrder);
            const pillarTitle = pillar?.title ?? '';
            
            const diffName = pillar?.difficulties[training?.difficultyOrder - 1]?.name ?? '';
      
            const trainingInfo = {
                trainingId: training?._id,
                trainingTitle: training?.title,
                pillarTitle: pillarTitle,
                difficultyName: diffName,
                path: `${training?.path}`,
                status: training?.userProgress?.status,
                seenVersion: training?.version ?? 1
            };
            
            this.store.dispatch(
                CurriculumActions.validateQuiz({
                    trainingInfo,
                    answers: this.selectedAnswers
                })
            );

            this.isLoading = true;
        });
    }

    showCertificate() {
        this.success = null;
        this.showCert = true;
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
