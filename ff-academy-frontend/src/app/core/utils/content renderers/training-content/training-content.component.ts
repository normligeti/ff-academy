import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-training-content',
  standalone: true,
    imports: [CommonModule],
    templateUrl: './training-content.component.html',
    styleUrl: './training-content.component.scss'

})
export class TrainingContentComponent {
    @Input() block!: any;
    @Input() lang = 'en';

    get(key: string): any {
        const trans = this.block.data?.translations?.find(t => t.lang === this.lang);
        
        return trans?.value?.[key] ?? this.block.data?.[key];
    }
}
