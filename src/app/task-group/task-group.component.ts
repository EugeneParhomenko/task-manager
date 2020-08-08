import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
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
  @Input() groupId: number;

  constructor(
    private taskService: TaskService
  ) { }

  public renderGroups(groupId?: number | 1): void {
      this.s1 = this.taskService.getGroups()
        .subscribe(groups => {
          this.active = this.groupId ? this.groupId : groupId;
          this.groups = groups;
        });
  }

  ngOnInit(): void {
    this.renderGroups();
  }

  public change(listId: number): void {
    this.active = listId;
    this.onChanged.emit(listId);
  }

  ngOnDestroy(): void {
    if(this.s1) {
      this.s1.unsubscribe();
    }
  }

}
