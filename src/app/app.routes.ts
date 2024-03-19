import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PublicboardComponent } from './pages/publicboard/publicboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HomeComponent },
  {
    path: 'publicboard/:id',
    component: PublicboardComponent,
  },
];
