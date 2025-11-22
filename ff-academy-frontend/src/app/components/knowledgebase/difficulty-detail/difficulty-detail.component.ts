import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CurriculumSelectors } from '../../../core/store/curriculum/curriculum.selectors';
import { CurriculumActions } from '../../../core/store/curriculum/curriculum.actions';
import { filter, map, Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CountdownPipe } from '../../../core/utils/countdown.pipe';
import { DIFFICULTY_NAME_TO_ORDER } from '../../../core/utils/difficulty.enum';

@Component({
  selector: 'app-difficulty-detail',
  imports: [RouterModule, CommonModule, CountdownPipe],
  templateUrl: './difficulty-detail.component.html',
  styleUrl: './difficulty-detail.component.scss'
})
export class DifficultyDetailComponent {

    private store = inject(Store);

    pillarOrder!: number;
    difficultyName!: string;
    difficultyOrder!: number;

    pillar$!: Observable<any>;
    trainings$!: Observable<any>;

    error$ = this.store.select(CurriculumSelectors.selectCurriculumError).pipe(
        filter(err => !!err),
        map(err => [err])
    );

    DIFFICULTY_NAME_TO_ORDER = DIFFICULTY_NAME_TO_ORDER;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.pillarOrder = Number(params.get('pillarOrder'));
            this.difficultyName = params.get('difficultyName') || '';
            this.difficultyOrder = DIFFICULTY_NAME_TO_ORDER[this.difficultyName];

            this.store.select(CurriculumSelectors.selectCurriculumLoaded)
                .pipe(take(1))
                .subscribe(loaded => {
                    if (!loaded) {
                        this.store.dispatch(CurriculumActions.loadDecoratedCurriculum());
                    }
                }
            );

            this.pillar$ = this.store.select(
                CurriculumSelectors.selectPillar(this.pillarOrder)
            );

            this.trainings$ = this.store.select(
                CurriculumSelectors.selectTrainingsForDifficulty(
                    this.pillarOrder,
                    this.difficultyOrder
                )
            );
        });
    }
}
