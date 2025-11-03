import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Store } from '@ngrx/store';
import { CurriculumSelectors } from '../../../core/store/curriculum/curriculum.selectors';
import { CurriculumActions } from '../../../core/store/curriculum/curriculum.actions';
import { filter, firstValueFrom, take } from 'rxjs';
import { ProfileActions } from '../../../core/store/profile/profile.actions';

@Component({
  selector: 'app-quiz',
  imports: [RouterModule, CommonModule, MatCheckboxModule, FormsModule],
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

    pillarOrder!: number;
    difficultyName!: string;
    trainingOrder!: number;
    quiz$ = this.store.select(CurriculumSelectors.selectQuiz);
    // questions: any[];
    counter = 1;

    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.pillarOrder = Number(params.get('pillarOrder'));
            this.difficultyName = params.get('difficultyName') || '';
            this.trainingOrder = Number(params.get('trainingOrder'));

            this.store.dispatch(
                CurriculumActions.loadQuiz({
                    pillarOrder: this.pillarOrder,
                    difficultyName: this.difficultyName,
                    trainingOrder: this.trainingOrder
                })
            );

            // this.quiz$.pipe(
            //     filter(q => !!q && !!q.questions),
            //     take(1)
            // )
            // .subscribe(quiz => {
            //     this.questions = quiz?.questions;
            // });
        });
    }


    // quiz stepper
    success: boolean | null = null; // null = not finished, true/false after last question
    selectedAnswers: Record<number, string | null> = {};
    checkedAnswers: Record<number, boolean> = {};
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
            const allCorrect = questions.every(q =>
                this.selectedAnswers[q.questionId] === q.correctAnswer
            );
            this.success = allCorrect;
            console.log('Quiz success?', this.success);
            this.onQuizComplete(this.success);
        }

        this.counter++;
    }

    download() {
        this.success = null;
        this.fakeDownload = true;
    }

    onQuizComplete(passed: boolean) {
        const progress = {
            pillarOrder: this.pillarOrder,
            difficultyOrder: this.getDifficultyOrder(this.difficultyName),
            trainingOrder: this.trainingOrder,
            completed: passed,
            failed: !passed
        };

        this.store.dispatch(
            ProfileActions.saveProgress({ userId: '68f027ed4ac1082b77d6d3c3', progress })
        );
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
