import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils/variables';

@Injectable({ providedIn: 'root' })
export class CurriculumService {
    constructor(
        private http: HttpClient,
        @Inject(BASE_URL) private baseUrl: string
    ) {}

    getPillars(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/curriculum/pillars`);
    }

    getDifficulties(pillarOrder: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/curriculum/pillars/${pillarOrder}/difficulties`);
    }

    getAllDifficulties(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/curriculum/difficulties`);
    }

    getTrainings(pillarOrder: number, difficultyName: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/curriculum/pillars/${pillarOrder}/${difficultyName}/trainings`);
    }

    getTrainingDetail(pillarOrder: number, difficultyName: string, trainingOrder: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/curriculum/pillars/${pillarOrder}/${difficultyName}/trainings/${trainingOrder}`);
    }

    getQuiz(pillarOrder: number, difficultyName: string, trainingOrder: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/curriculum/pillars/${pillarOrder}/${difficultyName}/trainings/${trainingOrder}/quiz`);
    }
}
