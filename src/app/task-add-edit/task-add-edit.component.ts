import { Component, OnInit, Input, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from '../common/model/task.model';
import { Subscription } from 'rxjs';
import { TaskService } from '../common/service/task.service';

@Component({
  selector: 'edm-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.scss']
})
export class TaskAddEditComponent implements OnInit, OnDestroy {

  buttonText = 'Добавить';
  formTitle = 'Добавить задачу';
  form: FormGroup;
  task: Task;
  @Input() isTaskEdit: boolean;
  @Input() groupId: number;
  @Input() openTaskId: number;
  @Output() renderTasks = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<any>();
  s1: Subscription;
  s2: Subscription;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.changeText();

    if(this.isTaskEdit) {
      this.setEditTask(this.openTaskId);
    } else {
      this.form = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(4)]),
      });
    }
  }

  submit(): void {
    if (this.isTaskEdit) {
      const title = this.form.value.title;
      const parent = this.task.parent;
      const done = this.task.done;
      const task: Task = {title, parent, done};

      this.s1 = this.taskService.updateTask(this.task.id, task)
        .subscribe(() => {
          this.renderTasks.emit();
          this.closePopup.emit();
        });
    } else {
      const title = this.form.value.title;
      const parent = this.groupId ? this.groupId : 1;
      const done = false;
      const task: Task = {title, parent, done};

      this.s1 = this.taskService.addTask(task)
        .subscribe(() => {
          this.renderTasks.emit();
          this.closePopup.emit();
        });
    }
  }

  ngOnDestroy(): void {
    if(this.s1) {
      this.s1.unsubscribe();
    }
    if(this.s2) {
      this.s2.unsubscribe();
    }
  }

  private setEditTask(id: number): void {
    this.s2 = this.taskService.getTask(id)
      .subscribe((task) => {
        this.task = task;

        this.form = new FormGroup({
          title: new FormControl(this.task.title, [Validators.required, Validators.minLength(4)]),
        });
      });
  }

  private changeText(): void {
    if (this.isTaskEdit) {
      this.buttonText = 'Редактировать';
      this.formTitle = 'Редактировать задачу';
    } else {
      this.buttonText = 'Добавить';
      this.formTitle = 'Добавить задачу';
    }
  }

}
