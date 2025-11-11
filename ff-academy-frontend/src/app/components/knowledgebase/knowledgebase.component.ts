import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { CurriculumActions } from '../../core/store/curriculum/curriculum.actions';
import { CurriculumSelectors } from '../../core/store/curriculum/curriculum.selectors';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-knowledgebase',
  imports: [RouterModule, CommonModule, TranslatePipe],
  templateUrl: './knowledgebase.component.html',
  styleUrl: './knowledgebase.component.scss'
})
export class KnowledgebaseComponent {
    private store = inject(Store);
    pillars$ = this.store.select(CurriculumSelectors.selectPillars);
    selectedPillar: any;

    ngOnInit() {
        this.store.select(CurriculumSelectors.selectPillarsLoaded)
            .pipe(take(1))
            .subscribe((loaded) => {
                if (!loaded) {
                    this.store.dispatch(CurriculumActions.loadPillars());
                }
            }
        );
    }

    onSelectPillar(pillar: any) {
        this.selectedPillar = pillar;
    }


    // dropdown display
    openStates: { [key: number]: boolean } = { 0:true, 1:false, 2:false };

    showSection(pillar) {
        let element = document.querySelector('.section-5') as HTMLElement;
        this.openStates = { 0:true, 1:false, 2:false };

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
