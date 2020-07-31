import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../common/service/task.service';
import { Task } from '../common/model/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edm-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {

  list: Task[] = [];
  s1: Subscription;

  constructor(
    private taskService: TaskService
  ) { }

  public renderTasks(parent: number): void {
    this.s1 = this.taskService.getGroupList(parent)
      .subscribe(list => this.list = list);
  }

  ngOnInit(): void {
    this.renderTasks(1);
  }

  ngOnDestroy(): void {
    if(this.s1) {
      this.s1.unsubscribe();
    }
  }

}
