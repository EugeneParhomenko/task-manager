import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskGroupComponent } from './task-group/task-group.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';
import { TaskService } from './common/service/task.service';
import { HttpClientModule } from '@angular/common/http';
import { GroupAddEditComponent } from './group-add-edit/group-add-edit.component';

@NgModule({
   declarations: [
      AppComponent,
      TaskGroupComponent,
      TaskListComponent,
      TaskAddEditComponent,
      GroupAddEditComponent
   ],
   imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule
   ],
   providers: [
      TaskService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
