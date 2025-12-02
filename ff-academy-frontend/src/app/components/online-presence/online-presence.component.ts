import { Component } from '@angular/core';
import { SafeUrlPipe } from '../../core/utils/safeUrl.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-online-presence',
  imports: [SafeUrlPipe, CommonModule],
  templateUrl: './online-presence.component.html',
  styleUrl: './online-presence.component.scss'
})
export class OnlinePresenceComponent {
    mainVideo;   // default video

    gallery = [
        { id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up (Official Video) (4K Remaster)' },
        { id: 'SLEBlJ9DTAI', title: 'Kitten eats salmon with doom music' },
        { id: 'ymxEmbALjIo', title: 'How to wash a Kitten without making it to scared' },
        { id: 'IzQh2Lhv4vQ', title: 'LORD OF THE RINGS ( full album soundtrack )' },
    ];

    ngOnInit() {
        this.mainVideo = this.gallery[0];
    }
  
    selectVideo(video) {
        this.mainVideo = video;
    }

    openStates: { [key: number]: boolean } = { 1: false, 2: false, 3: false, 4: false };

    toggleDropdown(n: number) {
        this.openStates[n] = !this.openStates[n];
    }
}
