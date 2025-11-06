import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CurriculumSelectors } from '../../../core/store/curriculum/curriculum.selectors';
import { CurriculumActions } from '../../../core/store/curriculum/curriculum.actions';
import { filter, interval, map, Observable, startWith, take, takeWhile } from 'rxjs';
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

    // countdown
    trainingsCountdowns: { [trainingId: string]: Observable<any> } = {};


    constructor(
        private route: ActivatedRoute
    ) {}
    
    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.pillarOrder = Number(params.get('pillarOrder'));
            this.difficultyName = params.get('difficultyName') || '';

            this.store.select(CurriculumSelectors.selectPillarsLoaded)
                .pipe(take(1))
                .subscribe((loaded) => {
                    if (!loaded) {
                        this.store.dispatch(CurriculumActions.loadPillars());
                    }
                }
            );
            
            this.store.dispatch(CurriculumActions.loadTrainingsForUser()
            );

            // Derive pillar observable for current pillar
            this.pillar$ = this.store.select(CurriculumSelectors.selectPillars).pipe(
                filter(pillars => !!pillars && pillars.length > 0),
                map(pillars => pillars.find(p => p.order === this.pillarOrder))
            );

            // Build countdowns for failed trainings whenever trainings change
            this.trainings$
                .pipe()
                .subscribe(trainings => {
                    this.trainingsCountdowns = {};
                    trainings
                        .filter(t => t.userProgress?.status === 'failed' && t.userProgress?.retryAvailableAt)
                        .forEach(t => {
                            this.trainingsCountdowns[t._id] = this.createCountdown$(t.userProgress.retryAvailableAt);
                        });
            });
        });
    }


    // countdown
    createCountdown$(targetDate: string | Date) {
        return interval(1000).pipe(
            startWith(0),
            map(() => this.calculateTimeRemaining(targetDate)),
            takeWhile(({ totalMs }) => totalMs > 0, true)
        );
    }
    
    calculateTimeRemaining(targetDate: string | Date) {
        const now = Date.now();
        const target = new Date(targetDate).getTime();
        const diff = Math.max(target - now, 0);
    
        const totalMs = diff;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
    
        return { totalMs, days, hours, minutes, seconds };
    }
}
