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
    difficulties$ = this.store.select(CurriculumSelectors.selectDifficulties);
    currentPillar: any;
    currentDifficulties: any[] = [];

    // images = [
    //     'assets/knowledgebase/dropdown-active.svg',
    //     'assets/knowledgebase/dropdown-inactive.svg'
    // ]

    ngOnInit() {
        // setTimeout(() => {
        //     this.images.forEach((src) => {
        //         const img = new Image();
        //         img.src = src;
        //     });
        // }, 200);
        // kick off the loading
        this.store.dispatch(CurriculumActions.loadPillars());
        this.store.dispatch(CurriculumActions.loadAllDifficulties());
    }

    onSelectPillar(pillar: any) {
        this.currentPillar = pillar;

        this.difficulties$
            .pipe(
                filter(d => !!d && d.length > 0),
                take(1) // only need the current snapshot
            )
            .subscribe(difficulties => {
                this.currentDifficulties = difficulties.filter(
                    diff => diff.pillarId === pillar._id
                );
                console.log('Difficulties for pillar', pillar._id, this.currentDifficulties);
                console.log(this.currentPillar);
            });
    }




    // dropdown display

    // dropdownOpen = true;
    // isSectionOpen = false;
    openStates: { [key: number]: boolean } = {0:true, 1:false, 2:false};

    showSection(pillar) {
        let element = document.querySelector('.section-5') as HTMLElement;

        // element.style.maxHeight = 1066 + 'px';
        
        if ((pillar.order !== this.currentPillar?.order) || !element.classList.contains('show')) {
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
