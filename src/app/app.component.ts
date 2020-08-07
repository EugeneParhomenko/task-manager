import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'edm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task-manager';

  @ViewChild(TaskListComponent) taskListComponent: TaskListComponent;

  groupId: number;
  openTaskId: number;
  isTaskEdit: boolean = false;
  isGroupEdit: boolean = false;

  isShowTask: boolean = false;
  isShowGroup: boolean = false;

  isShowPopup: boolean = false;

  public renderTasks(): void {
    this.taskListComponent.renderTasks(this.taskListComponent.groupId ? this.taskListComponent.groupId : 1);
  }

  public callEditTask(id: number): void {
    this.isTaskEdit = true;
    this.isShowPopup = true;
    this.isShowTask = true;
    this.openTaskId = id;
    console.log('Task ID = ' + this.openTaskId);
  }

  public addTask(): void {
    this.isShowPopup = true;
    this.isShowTask = true;
  }

  public addGroup(): void {
    this.isShowPopup = true;
    this.isShowGroup = true;
  }

  public closePopup(): void {
    this.isShowPopup = false;
    this.isShowTask = false;
    this.isShowGroup = false;
  }

  onChanged(event: number): void {
    this.groupId = event;
  }
}
