import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { KnowledgebaseComponent } from './components/knowledgebase/knowledgebase.component';
import { LoginComponent } from './components/login/login.component';
import { DifficultyDetailComponent } from './components/knowledgebase/difficulty-detail/difficulty-detail.component';
import { TrainingDetailComponent } from './components/knowledgebase/training-detail/training-detail.component';
import { QuizComponent } from './components/knowledgebase/quiz/quiz.component';
import { LockedComponent } from './components/locked/locked.component';
import { OnlinePresenceComponent } from './components/online-presence/online-presence.component';
import { Web3Component } from './components/web3/web3.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'knowledgebase',
        children: [
            { path: '', component: KnowledgebaseComponent },
            { path: 'pillars/:pillarOrder/:difficultyName', component: DifficultyDetailComponent },
            { path: 'pillars/:pillarOrder/:difficultyName/trainings/:trainingId', component: TrainingDetailComponent },
            { path: 'pillars/:pillarOrder/:difficultyName/trainings/:trainingId/quiz', component: QuizComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'locked', component: LockedComponent },
    { path: 'online-presence', component: OnlinePresenceComponent },
    { path: 'web3', component: Web3Component },
];
