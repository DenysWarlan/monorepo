import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '@monorepo/auth/login';
import {RegisterComponent} from '@monorepo/auth/register';
import {PageNotFoundComponent} from '@monorepo/page-not-found';
import {BookSearchComponent} from '@monorepo/books/search';
import {BookDetailsComponent} from '@monorepo/books/details';
import {CategoriesComponent} from '@monorepo/books/categories';
import {SettingsComponent} from '../../../../libs/profile/settings/src/settings.component';
import {FavoriteBooksComponent} from '../../../../libs/profile/favorite/src/favorite-books.component';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },

  { path: 'search', component: BookSearchComponent, },
  { path: 'book/:id', component: BookDetailsComponent, },
  { path: 'categories', component: CategoriesComponent, },

  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'favorite', component: FavoriteBooksComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
