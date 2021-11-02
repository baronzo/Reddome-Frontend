import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { PostComponent } from './components/post/post.compnent';

const routes: Routes = [
  { path: '', component:LayoutComponent },
  { path: 'post', component:PostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
