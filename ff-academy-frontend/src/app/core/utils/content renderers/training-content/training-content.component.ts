import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-training-content',
  standalone: true,
    imports: [CommonModule],
    template: `
        <ng-container [ngSwitch]="block.type">

            <h2 *ngSwitchCase="'heading'">{{ get('text') }}</h2>

            <p *ngSwitchCase="'paragraph'">{{ get('text') }}</p>

            <ul *ngSwitchCase="'list'">
                <li *ngFor="let item of get('items')">{{ item }}</li>
            </ul>

            <div *ngSwitchCase="'section'" class="section">
                <h3 class="section-title blue">{{ get('title') }}</h3>
                <p *ngIf="get('subTitle')">{{ get('subTitle') }}</p>
                <p *ngFor="let p of get('paragraphs')">{{ p }}</p>
            </div>

            <div *ngSwitchCase="'callout'" class="blue-box">
                <p class="blue">{{ get('text') }}</p>
            </div>

            <hr *ngSwitchCase="'divider'" class="divider">

            <div *ngSwitchCase="'task'" class="task">
                <h4>{{ get('title') }}</h4>
                <p><strong>Goal:</strong> {{ get('goal') }}</p>
                <div *ngFor="let step of get('steps')">
                    <p class="mbold">{{ step.title }}</p>
                    <ul>
                        <li *ngFor="let item of step.items">{{ item }}</li>
                    </ul>
                </div>
            </div>

            <!-- fallback -->
            <p *ngSwitchDefault>{{ block | json }}</p>

        </ng-container>
    `,
    styles: [`
        .blue-box { background: #eef6ff; border-radius: 12px; padding: 16px; }
        .divider { margin: 24px 0; border-color: #ccc; }
    `]
})
export class TrainingContentComponent {
    @Input() block!: any;
    @Input() lang = 'en';

    get(key: string): any {
        const trans = this.block.translations?.find(t => t.lang === this.lang);
        return trans?.value?.[key] ?? this.block.data?.[key];
    }
}
