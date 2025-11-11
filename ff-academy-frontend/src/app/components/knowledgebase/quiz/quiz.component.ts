import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Store } from '@ngrx/store';
import { CurriculumSelectors } from '../../../core/store/curriculum/curriculum.selectors';
import { CurriculumActions } from '../../../core/store/curriculum/curriculum.actions';
import { combineLatest, filter, firstValueFrom, map, Subject, take, takeUntil } from 'rxjs';
import { ProfileActions } from '../../../core/store/profile/profile.actions';
import { LoaderComponent } from "../../loader/loader.component";
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-quiz',
  imports: [RouterModule, CommonModule, MatCheckboxModule, FormsModule, LoaderComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
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
    trainingId!: string;
    savingProgressFailed: boolean;

    destroy$ = new Subject<void>();
    
    quiz$ = this.store.select(CurriculumSelectors.selectSelectedQuiz);
    training$ = this.store.select(CurriculumSelectors.selectSelectedTraining);

    loading$ = combineLatest([
        this.store.select(CurriculumSelectors.selectSelectedTrainingLoading),
        this.store.select(CurriculumSelectors.selectQuizLoading)
    ]).pipe(
        map(([trainingLoading, quizLoading]) => trainingLoading || quizLoading)
    );

    error$ = combineLatest([
        this.store.select(CurriculumSelectors.selectSelectedTrainingError),
        this.store.select(CurriculumSelectors.selectQuizError)
    ]).pipe(
        map(([trainingError, quizError]) =>
            [trainingError, quizError].filter(Boolean)   // remove null/undefined
        )
    );
    
    counter = 1;

    constructor(
        private route: ActivatedRoute,
        private actions$: Actions
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.trainingId = String(params.get('trainingId'));

            this.store.dispatch(
                CurriculumActions.loadQuiz({
                    trainingId: this.trainingId
                })
            );

            this.store.dispatch(
                CurriculumActions.loadSelectedTraining({
                    trainingId: this.trainingId
                })
            );
        });

        this.actions$
            .pipe(
                ofType(ProfileActions.saveProgressSuccess),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                // handle success
                this.success = this.allQuestionsCorrect;
            }
        );

        this.actions$
            .pipe(
                ofType(ProfileActions.saveProgressFailure),
                takeUntil(this.destroy$)
            )
            .subscribe(err => {
                // handle failure
                this.savingProgressFailed = true;
                this.success = false;
            }
        );
    }


    // quiz stepper
    success: boolean | null = null; // null = not finished, true/false after last question
    selectedAnswers: Record<number, string | null> = {};
    checkedAnswers: Record<number, boolean> = {};
    allQuestionsCorrect: boolean;
    fakeDownload = false;

    onSelect(questionId: number, answer: string) {
        if (this.checkedAnswers[questionId]) return; // prevent changing after submit
        this.selectedAnswers[questionId] = answer;
    }

    submit(questions: any[]) {
        const currentQ = questions.find(q => q.questionId === this.counter);
        if (!currentQ) return;
        
        if (!this.selectedAnswers[currentQ.questionId]) {
            alert('Please select an answer first.');
            return;
        }
        
        this.checkedAnswers[currentQ.questionId] = true;
        
        if (this.counter === questions.length) {
            this.allQuestionsCorrect = questions.every(q =>
                this.selectedAnswers[q.questionId] === q.correctAnswer
            );
            this.onQuizComplete();
        }

        this.counter++;
    }

    onQuizComplete() {
        this.training$.pipe(take(1)).subscribe(training => {
            const status = this.allQuestionsCorrect ? 'completed' : 'failed';
    
            const progress = {
                trainingId: training?._id,
                path: `${training?.path}`,
                status,
                seenVersion: training?.version ?? 1
            };
    
            this.store.dispatch(
                ProfileActions.saveProgress({
                    userId: '68f027ed4ac1082b77d6d3c3',
                    progressData: progress
                })
            );
        });
    }

    download() {
        this.success = null;
        this.fakeDownload = true;
    }

    getDifficultyOrder(name: string): number {
        switch (name.toLowerCase()) {
            case 'basic': return 1;
            case 'intermediate': return 2;
            case 'master': return 3;
            default: return 0;
        }
    }
}
