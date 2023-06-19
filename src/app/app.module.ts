import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import { NewsViewComponent } from './components/news-view/news-view.component';
import { SafePipe } from './pipes/safe.pipe';
import { PaginatorComponent } from './components/core/paginator/paginator.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import {MatIconModule} from "@angular/material/icon";
import { HeaderComponent } from './components/core/header/header.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CategoryListComponent,
    NewsListComponent,
    NewsViewComponent,
    SafePipe,
    PaginatorComponent,
    LoginComponent,
    ResetPasswordComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
