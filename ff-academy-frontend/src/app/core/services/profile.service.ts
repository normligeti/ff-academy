import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL } from '../utils/variables';

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
        this.baseUrl = baseUrl;
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}/users/create`, user);
    }

    saveUserProgress(userId: string, progressData: any): Observable<any[]> {
        return this.http.post<any[]>(
            `${this.baseUrl}/users/${userId}/progress`,
            progressData
        );
    }
}
