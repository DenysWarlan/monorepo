import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './authorized/home/home.component';
import {PageNotFoundComponent} from './authorized/page-not-found/page-not-found.component';
import {CreatePageComponent} from './authorized/create-page/create-page.component';
import {LinksComponent} from './authorized/links/links.component';
import {LoginComponent} from '@monorepo/auth/login';
import {RegisterComponent} from '@monorepo/auth/register';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
  { path: 'links', component: LinksComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
