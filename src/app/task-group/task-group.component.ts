import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(
    private taskService: TaskService
  ) { }

  public renderGroups(): void {
      this.s1 = this.taskService.getGroups()
        .subscribe(groups => this.groups = groups);
  }

  public changeActive(): void {
    //
  }

  ngOnInit(): void {
    this.renderGroups();
  }

  ngOnDestroy(): void {
    if(this.s1) {
      this.s1.unsubscribe();
    }
  }

}
