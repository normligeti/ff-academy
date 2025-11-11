import { BASE_URL } from '../utils/variables';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CurriculumService {
    constructor(
        private http: HttpClient,
        @Inject(BASE_URL) private baseUrl: string
    ) {}

    // // --- PILLARS ---
    // getPillars(): Observable<any[]> {
    //     return this.http.get<any[]>(`${this.baseUrl}/curriculum/pillars`);
    // }

    // // --- TRAININGS ---
    // getTrainingsForUser(): Observable<any[]> {
    //     return this.http.get<any[]>(
    //         `${this.baseUrl}/curriculum/pillars/user-trainings`
    //     );
    // }

    getDecoratedCurriculum(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/curriculum/curriculum-data`);
    }

    // --- TRAINING DETAIL (by ID) ---
    getTrainingById(trainingId: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/curriculum/trainings/${trainingId}`);
    }

    // --- TRAINING DETAIL (by path, optional) ---
    getTrainingByPath(path: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/curriculum/trainings/by-path/${path}`);
    }

    // --- QUIZ (by trainingId) ---
    getQuiz(trainingId: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/curriculum/trainings/${trainingId}/quiz`);
    }
}
