import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatInputModule } from '@angular/material/input'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatNativeDateModule } from '@angular/material/core';
import { BudgetComponent } from './budget/budget.component';
import { MatTableModule } from '@angular/material/table'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BudgetTableComponent } from './budget/budget-table/budget-table.component'; 
import { MatSelectModule} from '@angular/material/select'; 
import { DragDropModule } from '@angular/cdk/drag-drop';

import { HighchartsChartModule } from 'highcharts-angular';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegFormComponent } from './reg-form/reg-form.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

registerLocaleData(localeRu);

@NgModule({

  declarations: [
    AppComponent,
    RegFormComponent,
    PostsComponent,
    PostComponent,
    AuthFormComponent,
    BudgetComponent,
    BudgetTableComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatCardModule,
    MatIconModule,
    MatNativeDateModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    HighchartsChartModule,
    DragDropModule,
    MatProgressSpinnerModule
  ],
  
  providers: [],

  bootstrap: [AppComponent]
})

export class AppModule { }
