import { Component, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskGroupComponent } from './task-group/task-group.component';

@Component({
  selector: 'edm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'task-manager';

  @ViewChild(TaskListComponent) taskListComponent: TaskListComponent;
  @ViewChild(TaskGroupComponent) taskGroupComponent: TaskGroupComponent;

  groupId: number = 1;
  openTaskId: number;
  isTaskEdit: boolean = false;
  isGroupEdit: boolean = false;

  isShowTask: boolean = false;
  isShowGroup: boolean = false;

  isShowPopup: boolean = false;

  ngOnInit(): void {
    console.log(this.groupId);
  }

  public renderTasks(): void {
    this.taskListComponent.renderTasks(this.taskListComponent.groupId ? this.taskListComponent.groupId : 1);
  }

  public renderGroups(groupId?: number): void {
    this.taskGroupComponent.renderGroups(groupId);
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

  public callEditGroup(groupId: number): void {
    this.isGroupEdit = true;
    this.isShowPopup = true;
    this.isShowGroup = true;
    this.groupId = groupId;
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
