import { Component, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskGroupComponent } from './task-group/task-group.component';
import { TaskService } from './common/service/task.service';

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

  // popup marks
  isTaskEdit: boolean = false; // edit TASK
  isGroupEdit: boolean = false; // edit GROUP

  isShowTask: boolean = false; // TASK popup show
  isShowGroup: boolean = false; // GROUP popup show

  isShowPopup: boolean = false; // show POPUP

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}


  // render methods
  public renderTasks(): void {
    this.taskListComponent.renderTasks(this.taskListComponent.groupId ? this.taskListComponent.groupId : 1);
  }

  public renderGroups(groupId?: number): void {
    this.taskGroupComponent.renderGroups(groupId);
  }

  // popup methods (togglers)
  public callEditTask(id: number): void {
    this.isTaskEdit = true;
    this.isShowPopup = true;
    this.isShowTask = true;
    this.openTaskId = id;
  }

  public callEditGroup(groupId: number): void {
    this.isGroupEdit = true;
    this.isShowPopup = true;
    this.isShowGroup = true;
    this.groupId = groupId;
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

  // toggle group
  public onChanged(groupId: number): void {
    this.groupId = groupId;
  }

}
