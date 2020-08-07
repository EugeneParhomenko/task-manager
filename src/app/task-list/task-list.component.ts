import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../common/service/task.service';
import { Task } from '../common/model/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edm-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy, OnChanges {

  list: Task[] = [];
  s1: Subscription;

  @Input() groupId: number;
  @Output() callEditTask = new EventEmitter<number>();

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.renderTasks(1);
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes['groupId']) {
      this.renderTasks(this.groupId);
    }
  }

  ngOnDestroy(): void {
    if(this.s1) {
      this.s1.unsubscribe();
    }
  }

  public renderTasks(parent: number): void {
    this.s1 = this.taskService.getGroupList(parent)
      .subscribe(list => this.list = list);
  }

  public deleteTask(id: number): void {
    this.taskService.deleteTask(id)
      .subscribe(() => {
        this.renderTasks(this.groupId ? this.groupId : 1);
      });
  }

  public editTask(id: number): void {
    this.callEditTask.emit(id);
  }

}
