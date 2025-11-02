import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CurriculumSelectors } from '../../../core/store/curriculum/curriculum.selectors';
import { CurriculumActions } from '../../../core/store/curriculum/curriculum.actions';
import { filter, map, Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-difficulty-detail',
  imports: [RouterModule, CommonModule],
  templateUrl: './difficulty-detail.component.html',
  styleUrl: './difficulty-detail.component.scss'
})
export class DifficultyDetailComponent {
    private store = inject(Store);
    pillarOrder!: number;
    difficultyName!: string;

    trainings$ = this.store.select(CurriculumSelectors.selectTrainings);
    pillar$!: Observable<any>;

    constructor(
        private route: ActivatedRoute
    ) {}
    
    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.pillarOrder = Number(params.get('pillarOrder'));
            this.difficultyName = params.get('difficultyName') || '';

            this.store.select(CurriculumSelectors.selectLoadedPillars)
                .pipe(take(1))
                .subscribe(loaded => {
                    if (!loaded) {
                        this.store.dispatch(CurriculumActions.loadPillars());
                    }
                }
            );
            
            this.store.dispatch(CurriculumActions.loadTrainings({
                    pillarOrder: this.pillarOrder,
                    difficultyName: this.difficultyName
                })
            );

            // Derive pillar observable for current pillar
            this.pillar$ = this.store.select(CurriculumSelectors.selectPillars).pipe(
                filter(pillars => !!pillars && pillars.length > 0),
                map(pillars => pillars.find(p => p.order === this.pillarOrder))
            );
        });
    }
}
