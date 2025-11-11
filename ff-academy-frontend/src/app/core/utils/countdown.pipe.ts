import { Pipe, PipeTransform } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, startWith, takeWhile } from 'rxjs/operators';

@Pipe({
    name: 'countdown',
    standalone: true
})
export class CountdownPipe implements PipeTransform {

    transform(targetDate: string | Date): Observable<any> {
        return interval(1000).pipe(
            startWith(0),
            map(() => this.calculate(targetDate)),
            takeWhile(({ totalMs }) => totalMs > 0, true)
        );
    }

    private calculate(targetDate: string | Date) {
        const now = Date.now();
        const target = new Date(targetDate).getTime();
        const diff = Math.max(target - now, 0);

        return {
            totalMs: diff,
            days: Math.floor(diff / 86400000),
            hours: Math.floor((diff / 3600000) % 24),
            minutes: Math.floor((diff / 60000) % 60),
            seconds: Math.floor((diff / 1000) % 60)
        };
    }
}
