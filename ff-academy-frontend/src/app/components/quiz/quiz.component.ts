import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, state } from '@angular/animations';

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
    counter = 1;
    success: boolean | null = null; // null = not finished, true/false after last question

    increment() {
        this.counter++;
    }

    reset() {
        this.counter = 1;
    }

    questions = [
        {
            id: 1,
            text: 'What is your most important resource in the business?',
            answers: ['Your money', 'Your connections', 'Yourself', 'Your time', 'Luck'],
            correctAnswer: 'Yourself'
          },
          {
            id: 2,
            text: 'What happens if you are not the focus?',
            answers: [
              'Sooner or later you’ll seek motivation elsewhere',
              'You get easily distracted and start doubting',
              'Your business develops faster',
              'You may not get closer to your goals',
              'You decide for others instead'
            ],
            correctAnswer: 'You get easily distracted and start doubting'
          },
          {
            id: 3,
            text: 'What is the first element of the success formula in the Fireflies business?',
            answers: ['Money', 'Team', 'Company', 'Product', 'Training', 'You'],
            correctAnswer: 'You'
          },
          {
            id: 4,
            text: 'What does it mean to be teachable?',
            answers: [
              'You know everything from the beginning',
              'You are open to learning and applying new things',
              'You never make mistakes',
              'You listen to your sponsor line’s advice and carefully decide whether to apply it',
              'You try new methods'
            ],
            correctAnswer: 'You are open to learning and applying new things'
          },
          {
            id: 5,
            text: 'Why is it important to define your “why”?',
            answers: [
              'It helps you stay motivated',
              'It’s only important for your sponsor, that’s why they ask',
              'It only matters when launching a new product',
              'It actually distracts from the work',
              'It’s only important at the beginning, later it doesn’t matter'
            ],
            correctAnswer: 'It helps you stay motivated'
          }
    ];
    
    selectedAnswers: Record<number, string | null> = {};
    checkedAnswers: Record<number, boolean> = {};

    onSelect(questionId: number, answer: string) {
        if (this.checkedAnswers[questionId]) return; // prevent changing after submit
        this.selectedAnswers[questionId] = answer;
    }

    submit() {
        const currentQ = this.questions.find(q => q.id === this.counter);
        if (!currentQ) return;
        
        if (!this.selectedAnswers[currentQ.id]) {
            alert('Please select an answer first.');
            return;
        }
        
        this.checkedAnswers[currentQ.id] = true;
        
        if (this.counter === this.questions.length) {
            const allCorrect = this.questions.every(q =>
                this.selectedAnswers[q.id] === q.correctAnswer
            );
            this.success = allCorrect;
            console.log('Quiz success?', this.success);
        }

        this.increment();
    }
}
