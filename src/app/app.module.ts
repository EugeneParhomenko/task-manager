import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TaskGroupComponent } from './task-group/task-group.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';
import { TaskService } from './common/service/task.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TaskGroupComponent,
    TaskListComponent,
    TaskAddEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
