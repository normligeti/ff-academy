import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, mergeMap, tap } from 'rxjs/operators';
import { ProfileActions } from './profile.actions';
import { of } from 'rxjs';
// import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
// import { AuthService } from '../../services/AuthService';

@Injectable()
export class ProfileEffects {
    actions$ = inject(Actions);

    loadProfile$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(ProfileActions.loadProfile),
        switchMap(() =>
            this.profileService.loadProfile().pipe(
                map((response: any) =>
                    ProfileActions.loadProfileSuccess({
                        profile: response
                    })
                ),
                catchError((error) =>
                    of(ProfileActions.loadProfileFailure({ error: error.error }))
                )
            )
        )
        );
    });

    login$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(ProfileActions.login),
        switchMap(({ loginData }) =>
            this.profileService.login(loginData).pipe(
                map((response: any) =>
                    ProfileActions.loginSuccess({ token: response.token })
                ),
                catchError((error) =>
                    of(ProfileActions.loginFailure({ error: error.error }))
                )
            )
        )
        );
    });

    loginSuccess$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(ProfileActions.loginSuccess),
                tap(({ token }) => {
                    this.authService.setToken(token);
                })
            );
        },
        { dispatch: false }
    );

    logout$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(ProfileActions.logout),
        switchMap(() =>
            this.profileService.logout().pipe(
                map(() =>
                    ProfileActions.logoutSuccess()
                ),
                catchError((error) =>
                    of(ProfileActions.logoutFailure({ error: error.error }))
                )
            )
        )
        );
    });

    logoutSuccess$ = createEffect(
        () =>
          this.actions$.pipe(
            ofType(ProfileActions.logoutSuccess),
            tap(() => {
              this.router.navigate(['/login']); 
            })
          ),
        { dispatch: false }
    );

    // saveProgress$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(ProfileActions.saveProgress),
    //         mergeMap(({ userId, progressData }) =>
    //             this.profileService.saveUserProgress(userId, progressData).pipe(
    //                 map(updatedProgress =>
    //                     ProfileActions.saveProgressSuccess({ updatedProgress })
    //                 ),
    //                 catchError(error =>
    //                     of(ProfileActions.saveProgressFailure({ error }))
    //                 )
    //             )
    //         )
    //     )
    // );

    updatePreferredLanguage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileActions.updatePreferredLanguage),
            mergeMap(({ lang }) =>
                this.profileService.updatePreferredLanguage(lang).pipe(
                    map(() => ProfileActions.updatePreferredLanguageSuccess({ lang })),
                    catchError(error =>
                        of(ProfileActions.updatePreferredLanguageFailure({ error }))
                    )
                )
            )
        )
    );
    

    constructor(
        private router: Router,
        private profileService: ProfileService,
        private authService: AuthService,
    ) {}
}
