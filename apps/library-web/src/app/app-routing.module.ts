import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './authorized/home/home.component';
import {PageNotFoundComponent} from './authorized/page-not-found/page-not-found.component';
import {CreatePageComponent} from './authorized/create-page/create-page.component';
import {LinksComponent} from './authorized/links/links.component';
import {LoginComponent} from '../../../../libs/auth/login/src';
import {RegisterComponent} from '../../../../libs/auth/register/src';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ] },
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
