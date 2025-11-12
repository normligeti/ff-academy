import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CurriculumSelectors } from '../../../core/store/curriculum/curriculum.selectors';
import { CurriculumActions } from '../../../core/store/curriculum/curriculum.actions';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../loader/loader.component";
import { combineLatest, map, Observable, take } from 'rxjs';
import { CountdownPipe } from '../../../core/utils/countdown.pipe';
import { TrainingContentComponent } from "../../../core/utils/content renderers/training-content/training-content.component";

@Component({
  selector: 'app-training-detail',
  imports: [RouterModule, CommonModule, CountdownPipe, TrainingContentComponent],
  templateUrl: './training-detail.component.html',
  styleUrl: './training-detail.component.scss'
})
export class TrainingDetailComponent {
    private store = inject(Store);

    trainingId!: string;
    pillarOrder!: number;
    difficultyName!: string;

    training$ = this.store.select(CurriculumSelectors.selectSelectedTraining);
    nextTrainings$!: Observable<any[]>;
    trainingsForDifficulty$!: Observable<any[]>;

    error$ = this.store.select(CurriculumSelectors.selectSelectedTrainingError);

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.trainingId = String(params.get('trainingId'));
            this.pillarOrder = Number(params.get('pillarOrder'));
            this.difficultyName = params.get('difficultyName') || '';

            this.store.select(CurriculumSelectors.selectCurriculumLoaded)
                .pipe(take(1))
                .subscribe(loaded => {
                    if (!loaded) {
                        this.store.dispatch(CurriculumActions.loadDecoratedCurriculum());
                    }
                }
            );

            this.store.dispatch(
                CurriculumActions.loadSelectedTraining({
                    trainingId: this.trainingId
                })
            );

            this.trainingsForDifficulty$ = this.store.select(
                CurriculumSelectors.selectTrainingsForDifficulty(
                    this.pillarOrder,
                    this.difficultyName
                )
            );

            this.nextTrainings$ = combineLatest([
                this.trainingsForDifficulty$,
                this.training$
            ]).pipe(
                map(([trainings, current]) => {
                    if (!trainings || !current) return [];

                    const index = trainings.findIndex(t => t._id === current._id);
                    if (index === -1) return [];

                    return trainings.slice(index + 1);
                })
            );
        });
    }
}