import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Router } from '@angular/router';


export const lockedResourceInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    
    return next(req).pipe(
        // delay(1000),
        catchError((err: HttpErrorResponse) => {
            if (err.status === 403) {
                // router.navigate(['/locked']);
            }
            return throwError(() => err);
        })
    );
};
