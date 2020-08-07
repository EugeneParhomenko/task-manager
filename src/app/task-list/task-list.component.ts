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
  s2: Subscription;
  s3: Subscription;

  @Input() groupId: number;
  @Output() callEditTask = new EventEmitter<number>();

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.renderTasks(1);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes['groupId']) {
      this.renderTasks(this.groupId);
    }
  }

  ngOnDestroy(): void {
    if(this.s1) {
      this.s1.unsubscribe();
    }
    if(this.s2) {
      this.s2.unsubscribe();
    }
    if(this.s3) {
      this.s2.unsubscribe();
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

  public toggleTask(id: number): void{
    this.s2 = this.taskService.getTask(id)
      .subscribe((task) => {
        task.done = !task.done;

        this.s3 = this.taskService.updateTask(id, task)
          .subscribe(() => {
            this.renderTasks(this.groupId ? this.groupId : 1);
          });
      });
  }

  public editTask(id: number): void {
    this.callEditTask.emit(id);
  }

}
