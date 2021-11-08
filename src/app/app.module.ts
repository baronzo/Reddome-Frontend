import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
import {MatButtonModule} from '@angular/material/button';
import { SignupComponent } from './components/signup/signup.component';
import { PostComponent } from './components/post/post.compnent';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavBarComponent,
    HomeComponent,
    FeedComponent,
    SigninComponent,
    PostfeedComponent,
    RankingComponent,
    RankingComponent,
    SignupComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CalendarModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
