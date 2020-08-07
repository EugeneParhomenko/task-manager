import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {TaskService } from '../common/service/task.service';
import { Group } from '../common/model/group.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edm-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.scss']
})
export class TaskGroupComponent implements OnInit, OnDestroy {

  groups: Group[] = [];
  s1: Subscription;
  active: number;

  @Output() onChanged = new EventEmitter<number>();

  constructor(
    private taskService: TaskService
  ) { }

  public renderGroups(): void {
      this.s1 = this.taskService.getGroups()
        .subscribe(groups => {
          this.active = 1;
          this.groups = groups;
        });
  }

  ngOnInit(): void {
    this.renderGroups();
  }

  change(listId: number): void {
    this.active = listId;
    this.onChanged.emit(listId);
  }

  ngOnDestroy(): void {
    if(this.s1) {
      this.s1.unsubscribe();
    }
  }

}
