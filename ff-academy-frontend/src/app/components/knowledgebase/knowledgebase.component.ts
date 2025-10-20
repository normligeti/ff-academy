import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-knowledgebase',
  imports: [RouterModule, CommonModule, TranslatePipe],
  templateUrl: './knowledgebase.component.html',
  styleUrl: './knowledgebase.component.scss'
})
export class KnowledgebaseComponent {
    dropdownOpen = true;
    // isSectionOpen = false;

    showSection() {
        let element = document.querySelector('.section-5') as HTMLElement;

        // if (!this.isSectionOpen) {
            // element.style.maxHeight = 1066 + 'px';
            element.classList.toggle('show');

            setTimeout(() => {
                document.querySelector('.section-5')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 500);
        // } else {
        //     element.classList.remove('.show');

        // }

        // this.isSectionOpen = !this.isSectionOpen
    }

    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
        
        if (this.dropdownOpen) {
            setTimeout(() => {
                document.querySelector('.section-5')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
}
