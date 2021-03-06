import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FeedComponent } from './components/feed/feed.component';
import { PostComponent } from './components/post/post.compnent';
import { RankingComponent } from './components/ranking/ranking.component';
import { CreatepostComponent } from './components/createpost/createpost.component';
import {GroupComponent} from "./components/group/group.component";

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'feed', component:FeedComponent },
  { path: 'post/:postId', component:PostComponent },
  { path: 'Ranking', component:RankingComponent },
  { path: 'group/:groupId', component: GroupComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
