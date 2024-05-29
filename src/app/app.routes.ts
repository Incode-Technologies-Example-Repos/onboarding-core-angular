import { Routes } from '@angular/router';
import { SmileComponent } from './components/smile/smile.component';

export const routes: Routes = [
    {path: 'smile', component: SmileComponent},
    {path: '', redirectTo: '/smile', pathMatch: 'full'},
    {path: '**', redirectTo: '/smile'}
];
