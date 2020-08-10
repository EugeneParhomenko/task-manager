import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../common/service/task.service';
import { Task } from '../common/model/task.model';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'edm-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy, OnChanges {


  list: Task[] = [];
  empty: boolean = false;

  @Input() groupId: number;
  @Output() callEditTask = new EventEmitter<number>();
  @Output() callEditGroup = new EventEmitter<number>();
  @Output() renderGroups = new EventEmitter<any>();


  constructor(
    private taskService: TaskService
  ) { }



  ngOnInit(): void {
    console.log('Init List component');
    this.renderTasks(1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Change List component');
    if(changes && changes['groupId']) {
      this.renderTasks(this.groupId);
    }
  }

  ngOnDestroy(): void {}




  public renderTasks(parent: number): void {
    console.log(`Render TASK, by parent ID = ${parent}`);
    this.taskService.getGroupList(parent).pipe(untilDestroyed(this))
      .subscribe((tasks) => {
        if (tasks && tasks.length > 0) {
          this.list = tasks;
          this.empty = false;
        } else {
          this.empty = true;
        }
      });
  }

  public deleteTask(id: number): void {
    console.log('Delete TASK');
    this.taskService.deleteTask(id).pipe(untilDestroyed(this))
      .subscribe(() => {
        this.renderTasks(this.groupId ? this.groupId : 1);
        // this.renderGroups.emit(this.groupId);
      });
  }

  public editGroup(): void {
    this.callEditGroup.emit(this.groupId ? this.groupId : 1);
  }

  public deleteGroup(): void {
    console.log('Delete GROUP');
    this.taskService.deleteGroup(this.groupId).pipe(untilDestroyed(this))
      .subscribe(() => {
        this.taskService.getGroupList(this.groupId).pipe(untilDestroyed(this)).subscribe((tasks) => {
          if (tasks && tasks.length > 0) {
            for (let task of tasks) {
              this.taskService.deleteTask(task.id).pipe(untilDestroyed(this)).subscribe();
            }
          }
          this.renderGroups.emit(1);
          this.renderTasks(1);
        });
      });
  }

  public toggleTask(taskId: number): void{
    console.log('Toggle TASK');
    this.taskService.getTask(taskId).pipe(untilDestroyed(this))
      .subscribe((task) => {
        task.done = !task.done;

        this.taskService.updateTask(taskId, task).pipe(untilDestroyed(this))
          .subscribe(() => {
            this.renderTasks(this.groupId ? this.groupId : 1);
          });
      });
  }

  public editTask(taskId: number): void {
    this.callEditTask.emit(taskId);
  }

}
