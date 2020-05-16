import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { QuestionsComponent } from '../../components/questions/questions.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';




import { AuthGuard } from "../guard/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'questions', component: QuestionsComponent,canActivate: [AuthGuard]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
