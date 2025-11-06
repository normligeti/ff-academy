import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CurriculumSelectors } from '../../../core/store/curriculum/curriculum.selectors';
import { CurriculumActions } from '../../../core/store/curriculum/curriculum.actions';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../loader/loader.component";

@Component({
  selector: 'app-training-detail',
  imports: [RouterModule, CommonModule, LoaderComponent],
  templateUrl: './training-detail.component.html',
  styleUrl: './training-detail.component.scss'
})
export class TrainingDetailComponent {
    private store = inject(Store);

    trainingId!: string;
    training$ = this.store.select(CurriculumSelectors.selectSelectedTraining);

    constructor(
        private route: ActivatedRoute
    ) {}

    // TODO should handle removing training from selected if necessary
    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.trainingId = String(params.get('trainingId'));

            this.store.dispatch(
                CurriculumActions.loadTrainingDetail({
                    trainingId: this.trainingId
                })
            );
        });
    }
}
