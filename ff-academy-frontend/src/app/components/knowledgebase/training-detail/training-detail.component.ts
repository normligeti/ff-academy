import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CurriculumSelectors } from '../../../core/store/curriculum/curriculum.selectors';
import { CurriculumActions } from '../../../core/store/curriculum/curriculum.actions';
import { CommonModule } from '@angular/common';
import { combineLatest, map, Observable, take } from 'rxjs';
import { CountdownPipe } from '../../../core/utils/countdown.pipe';
import { TrainingContentComponent } from "../../../core/utils/content renderers/training-content/training-content.component";
import { DIFFICULTY_NAME_TO_ORDER } from '../../../core/utils/difficulty.enum';
import { ParamService } from '../../../core/services/param.service';

@Component({
    selector: 'app-training-detail',
    imports: [RouterModule, CommonModule, CountdownPipe, TrainingContentComponent],
    providers: [ParamService],
    templateUrl: './training-detail.component.html',
    styleUrl: './training-detail.component.scss'
})
export class TrainingDetailComponent {
    private store = inject(Store);

    // trainingId!: string;
    // pillarOrder!: number;
    // difficultyName!: string;
    // difficultyOrder!: number;

    training$: Observable<any>;
    // nextTrainings$!: Observable<any[]>;
    // trainingsForDifficulty$!: Observable<any[]>;

    // error$ = this.store.select(CurriculumSelectors.selectSelectedTrainingError);
    // DIFFICULTY_NAME_TO_ORDER = DIFFICULTY_NAME_TO_ORDER;

    constructor(
        private route: ActivatedRoute,
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

            this.training$.pipe().subscribe(training => {
                console.log('training detail component');
                console.log(training);
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

            // this.training$.pipe().subscribe(training => {
            //     console.log('training detail component');
            //     console.log(training);
            // });


            // this.trainingsForDifficulty$ = this.store.select(
            //     CurriculumSelectors.selectTrainingsForDifficulty(
            //         this.pillarOrder,
            //         this.difficultyOrder
            //     )
            // );

            // this.nextTrainings$ = combineLatest([
            //     this.trainingsForDifficulty$,
            //     this.training$
            // ]).pipe(
            //     map(([trainings, current]) => {
            //         if (!trainings || !current) return [];

            //         const index = trainings.findIndex(t => t._id === current._id);
            //         if (index === -1) return [];

            //         return trainings.slice(index + 1);
            //     })
            // );
        // });
    }

    reloadData() {
        this.store.dispatch(CurriculumActions.loadDecoratedCurriculum());
    }
}