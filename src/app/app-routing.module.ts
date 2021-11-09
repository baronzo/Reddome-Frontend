import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { FeedComponent } from './components/feed/feed.component';
import { PostComponent } from './components/post/post.compnent';
import { RankingComponent } from './components/ranking/ranking.component';
import { CreatepostComponent } from './components/createpost/createpost.component';

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'feed', component:FeedComponent },
  { path: 'post', component:PostComponent },
  { path: 'Ranking', component:RankingComponent },
  { path: 'createpost', component:CreatepostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
