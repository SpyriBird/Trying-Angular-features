import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { BudgetComponent } from './budget/budget.component';
import { PostsComponent } from './posts/posts.component';
import { RegFormComponent } from './reg-form/reg-form.component';

const routes: Routes = [
  {path: '', component: RegFormComponent},
  {path: 'auth', component: AuthFormComponent},
  {path: 'posts/:pos', component: PostsComponent},
  {path: 'posts', redirectTo: 'posts/1'},
  {path: 'budget', component: BudgetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}
