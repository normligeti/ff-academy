import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { CurriculumActions } from '../../core/store/curriculum/curriculum.actions';
import { CurriculumSelectors } from '../../core/store/curriculum/curriculum.selectors';
import { Observable, take } from 'rxjs';
import { DIFFICULTY_ORDER_TO_NAME } from '../../core/utils/difficulty.enum';
import { selectPreferredLanguage } from '../../core/store/profile/profile.selectors';

@Component({
  selector: 'app-knowledgebase',
  imports: [RouterModule, CommonModule, TranslatePipe],
  templateUrl: './knowledgebase.component.html',
  styleUrl: './knowledgebase.component.scss'
})
export class KnowledgebaseComponent {
    private store = inject(Store);

    pillars$ = this.store.select(CurriculumSelectors.selectPillars);
    selectedPillar$!: Observable<any>;
    selectedPillar: any = null;
    currentLang$ = this.store.select(selectPreferredLanguage);

    DIFFICULTY_ORDER_TO_NAME = DIFFICULTY_ORDER_TO_NAME;

    ngOnInit() {
        this.store.select(CurriculumSelectors.selectCurriculumLoaded)
            .pipe(take(1))
            .subscribe(loaded => {
                if (!loaded) {
                    this.store.dispatch(CurriculumActions.loadDecoratedCurriculum());
                }
            }
        );
    }

    onSelectPillar(pillar: any) {
        this.selectedPillar = pillar;
        this.selectedPillar$ = this.store.select(
            CurriculumSelectors.selectPillarByOrder(pillar?.order)
        );
    }


    // dropdown display
    openStates: { [key: number]: boolean };

    showSection(pillar) {
        let element = document.querySelector('.section-5') as HTMLElement;

        this.openStates = { 0:false, 1:false, 2:false };
        let showIndex = pillar?.difficulties.findIndex(d => d.status === 'in_progress');
        if (showIndex) this.openStates[showIndex] = true;

        if ((pillar?.order !== this.selectedPillar?.order) || !element.classList.contains('show')) {
            element.classList.add('show');
            setTimeout(() => {
                document.querySelector('.section-5')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        } else {
            element.classList.remove('show');
        }

        setTimeout(() => {
            document.querySelector('.section-5')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 500);
       
        this.onSelectPillar(pillar);
    }

    toggleDropdown(index: number) {
        this.openStates[index] = !this.openStates[index];
        
        if (this.openStates[index]) {
            
            setTimeout(() => {
                document.getElementById(`dropdown-${index}`)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
}
