import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FeedComponent } from './components/feed/feed.component';
import { SigninComponent } from './components/signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon';
import { PostfeedComponent } from './components/postfeed/postfeed.component' 
import { RankingComponent } from './components/ranking/ranking.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavBarComponent,
    HomeComponent,
    FeedComponent,
    SigninComponent,
    PostfeedComponent,
    RankingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
