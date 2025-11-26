import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, mergeMap } from 'rxjs/operators';
import { ProfileActions } from './profile.actions';
import { of } from 'rxjs';
// import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
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
                    ProfileActions.loginSuccess()
                ),
                catchError((error) =>
                    of(ProfileActions.loginFailure({ error: error.error }))
                )
            )
        )
        );
    });

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
        // private authService: AuthService,
        private profileService: ProfileService,
    ) {}
}
