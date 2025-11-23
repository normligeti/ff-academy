import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../core/store/profile/profile.selectors';
import { ProfileActions } from '../../core/store/profile/profile.actions';

@Component({
    selector: 'main-header',
    imports: [RouterModule, CommonModule, TranslatePipe],
    templateUrl: './main-header.component.html',
    styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {
    private store = inject(Store);
    isAuthenticated$ = this.store.select(selectIsAuthenticated);

    langs: readonly string[];

    constructor(private translate: TranslateService) {
        this.langs = this.translate.getLangs();
    }

    switchLang(lang: string) {
        this.translate.use(lang);
    }

    logout() {
        this.store.dispatch(ProfileActions.logout());
    }
}
