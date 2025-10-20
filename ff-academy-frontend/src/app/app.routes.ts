import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { KnowledgebaseComponent } from './components/knowledgebase/knowledgebase.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { Pillar1Component } from './components/pillar-1/pillar-1.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'knowledgebase', component: KnowledgebaseComponent },
    { path: 'knowledgebase/pillar-1', component: Pillar1Component },
    { path: 'knowledgebase/pillar-1/training', component: LessonComponent },
    { path: 'knowledgebase/pillar-1/quiz', component: QuizComponent },
    { path: 'login', component: LoginComponent },

];
