import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CurriculumSelectors } from '../../../core/store/curriculum/curriculum.selectors';
import { CurriculumActions } from '../../../core/store/curriculum/curriculum.actions';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../loader/loader.component";
import { combineLatest, map, Observable, take } from 'rxjs';

@Component({
  selector: 'app-training-detail',
  imports: [RouterModule, CommonModule, LoaderComponent],
  templateUrl: './training-detail.component.html',
  styleUrl: './training-detail.component.scss'
})
export class TrainingDetailComponent {
    private store = inject(Store);

    training$ = this.store.select(CurriculumSelectors.selectSelectedTraining);
    trainings$: Observable<any>;
    nextTrainings$: Observable<any>;
    loading$ = this.store.select(CurriculumSelectors.selectSelectedTrainingLoading);
    error$ = this.store.select(CurriculumSelectors.selectSelectedTrainingError);

    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            let trainingId = String(params.get('trainingId'));
            let pillarOrder = Number(params.get('pillarOrder'));
            let difficultyName = params.get('difficultyName') || '';
            
            this.store.dispatch(
                CurriculumActions.loadSelectedTraining({
                    trainingId: trainingId
                })
            );

            this.store.select(CurriculumSelectors.selectTrainingsLoaded)
                .pipe(take(1))
                .subscribe((loaded) => {
                    if (!loaded) {
                        this.store.dispatch(CurriculumActions.loadTrainingsForUser());
                    }
                }
            );

            this.trainings$ = this.store.select(
                CurriculumSelectors.selectTrainingsForDifficulty(
                    pillarOrder,
                    difficultyName
                )
            );

            this.nextTrainings$ = combineLatest([
                this.trainings$,
                this.training$
            ]).pipe(
                map(([trainings, current]) => {
                    if (!trainings || !current) return [];
            
                    // Keep only trainings that come AFTER the current one
                    return trainings.filter(t => t.order > current.order);
                })
            );
        });
    }
}
