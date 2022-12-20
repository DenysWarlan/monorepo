import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './authorized/home/home.component';
import { PageNotFoundComponent } from './authorized/page-not-found/page-not-found.component';
import { CreatePageComponent } from './authorized/create-page/create-page.component';
import { LinksComponent } from './authorized/links/links.component';
import { authRoutes } from '../../../../libs/auth/src';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', children: authRoutes },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreatePageComponent },
  { path: 'links', component: LinksComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
