import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import {TaskService } from '../common/service/task.service';
import { Group } from '../common/model/group.model';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'edm-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.scss']
})
export class TaskGroupComponent implements OnInit, OnDestroy, OnChanges {


  groups: Group[] = [];
  @Output() onChanged = new EventEmitter<number>();
  @Input() groupId: number;


  constructor(
    private taskService: TaskService
  ) { }


  ngOnInit(): void {
    console.log('Init Group component');
    this.renderGroups(1);
    console.log(this.groupId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Change Group component');
    if(changes && changes['groupId']) {
      this.renderGroups(this.groupId);
    }
  }

  ngOnDestroy(): void {}



  public change(listId: number): void {
    this.onChanged.emit(listId);
  }

  public renderGroups(groupId?: number | 1): void {
    console.log(`start render groups, active id = ${this.groupId}`);
    this.taskService.getGroups().pipe(untilDestroyed(this))
      .subscribe(groups => {
        this.groupId = groupId;
        this.groups = groups;
      });
  }


}
