import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { effects, reducers, metaReducers } from './core/store/store';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BASE_URL, PRODUCTION_HOSTNAMES } from './core/utils/variables';
import { environment } from '../environments/environment';
import { provideTranslateService } from '@ngx-translate/core';
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";
import { lockedResourceInterceptor } from './core/utils/locked-resource.interceptor';

const scrollConfig: InMemoryScrollingOptions = {
    scrollPositionRestoration: 'enabled'
};
  
const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideRouter(routes, inMemoryScrollingFeature),
        provideAnimations(),
        provideStore(reducers, { metaReducers }),
        provideEffects(effects),
        provideHttpClient(
            withInterceptors([
                lockedResourceInterceptor
            ])
        ),
        {
            provide: BASE_URL, 
            useValue: PRODUCTION_HOSTNAMES.includes(window.location.hostname) ? environment.API_BASE_PATH : environment.DEV_API_BASE_PATH 
        },
        provideTranslateService({
            loader: provideTranslateHttpLoader({
              prefix: '/assets/i18n/',
              suffix: '.json'
            }),
            fallbackLang: 'en',
            lang: 'en'
        })
    ]
};
