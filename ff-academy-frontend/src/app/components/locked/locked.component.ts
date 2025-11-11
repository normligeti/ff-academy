import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-locked',
  imports: [RouterModule],
  templateUrl: './locked.component.html',
  styleUrl: './locked.component.scss'
})
export class LockedComponent {

    constructor(private route: ActivatedRoute) {
        
    }
}