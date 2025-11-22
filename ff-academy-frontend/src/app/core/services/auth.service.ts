// import { Inject, Injectable, Optional } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { BASE_URL } from '../utils/variables';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//     private baseUrl;
    

//     constructor(
//         protected http: HttpClient,
//         @Inject(BASE_URL) baseUrl: string
//     ) {
//         this.baseUrl = baseUrl;
//     }

//     login(loginData): Observable<any> {
//         return this.http.post(`${this.baseUrl}/users/login`, loginData);
        
//     }

//     logout(): Observable<any> {
//         return this.http.get(`${this.baseUrl}/users/logout`);
//     }
// }
