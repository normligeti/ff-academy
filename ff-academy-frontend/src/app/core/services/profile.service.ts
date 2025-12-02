import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL, PRODUCTION_HOSTNAMES } from '../utils/variables';
import { environment } from '../../../environments/environment';

export interface User {
    _id?: string;
    name: string;
    email: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
    private baseUrl;

    constructor(
        protected http: HttpClient,
        @Inject(BASE_URL) baseUrl: string
    ) {
        console.log('Injected BASE_URL =', baseUrl);
        console.log(PRODUCTION_HOSTNAMES, window.location.hostname);
        console.log('environment', environment);
        this.baseUrl = baseUrl;
    }

    login(loginData): Observable<any> {
        return this.http.post(`${this.baseUrl}/users/login`, loginData, { withCredentials: true });
    }

    logout(): Observable<any> {
        return this.http.post(`${this.baseUrl}/users/logout`, {}, { withCredentials: true });
    }

    loadProfile(): Observable<any> {
        return this.http.get(`${this.baseUrl}/users/get-user-profile`, { withCredentials: true });
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}/users/create`, user);
    }

    // saveUserProgress(userId: string, progressData: any): Observable<any[]> {
    //     return this.http.post<any[]>(
    //         `${this.baseUrl}/users/${userId}/progress`,
    //         progressData
    //     );
    // }

    updatePreferredLanguage(lang: string): Observable<any> {
        return this.http.put(`${this.baseUrl}/users/set-preferred-language`, { lang }, { withCredentials: true }
        );
    }
    
}
