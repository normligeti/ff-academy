import { Component, inject } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { ProfileActions } from './core/store/profile/profile.actions';
import { selectPreferredLanguage } from './core/store/profile/profile.selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainHeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'ff-academy-frontend';

    private store = inject(Store);

    preferredLanguage$ = this.store.select(selectPreferredLanguage);
    
    constructor( 
        public router: Router,
        private translate: TranslateService
    ) { 
        // register available languages once
        this.translate.addLangs(['en', 'hu']);

        // set default language
        this.translate.setFallbackLang('en');

        this.preferredLanguage$
            .pipe(filter(lang => !!lang))
            .subscribe(lang => this.translate.use(lang));
    }
    
    ngOnInit(): void {
        this.store.dispatch(ProfileActions.loadProfile());

        this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(() => {
            this.initScroll();
        });
    }

    initScroll() {
        setTimeout(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    
                    if (entry.intersectionRatio > 0.9) {
                        entry.target.classList.add('scroll-show');
                    } 
                    // if (entry.intersectionRatio === 0) {
                    //     entry.target.classList.remove('scroll-show');
                    // }
                })
            }, {threshold: [0, 0.9]});
            
            const hiddenElements = document.querySelectorAll('.scroll-hidden');
            hiddenElements.forEach((el) => observer.observe(el));
        });
    }
}
