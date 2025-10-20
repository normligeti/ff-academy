import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'main-header',
    imports: [RouterModule, CommonModule, TranslatePipe],
    templateUrl: './main-header.component.html',
    styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {
    langs: readonly string[];

    constructor(private translate: TranslateService) {
        this.langs = this.translate.getLangs();
    }

    switchLang(lang: string) {
        this.translate.use(lang);
    }
}
