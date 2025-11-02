import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CurriculumSelectors } from '../../../core/store/curriculum/curriculum.selectors';
import { CurriculumActions } from '../../../core/store/curriculum/curriculum.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-training-detail',
  imports: [RouterModule, CommonModule],
  templateUrl: './training-detail.component.html',
  styleUrl: './training-detail.component.scss'
})
export class TrainingDetailComponent {
    private store = inject(Store);

    pillarOrder!: number;
    difficultyName!: string;
    trainingOrder!: number;

    training$ = this.store.select(CurriculumSelectors.selectTrainingDetail);

    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.pillarOrder = Number(params.get('pillarOrder'));
            this.difficultyName = params.get('difficultyName') || '';
            this.trainingOrder = Number(params.get('trainingOrder'));

            this.store.dispatch(
                CurriculumActions.loadTrainingDetail({
                    pillarOrder: this.pillarOrder,
                    difficultyName: this.difficultyName,
                    trainingOrder: this.trainingOrder
                })
            );
        });
    }
}
