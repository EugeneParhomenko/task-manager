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
export class TaskAddEditComponent implements OnInit, OnChanges, OnDestroy {

  buttonText = 'Добавить';
  formTitle = 'Добавить задачу';
  form: FormGroup;
  @Input() isTaskEdit: boolean;
  @Input() groupId: number;
  @Output() renderTasks = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<any>();
  s1: Subscription;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.changeText();

    if(this.isTaskEdit) {
      this.form = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      });
    } else {
      this.form = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      });
    }
  }

  submit(): void {
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

  ngOnChanges(): void {
    this.changeText();
  }

  ngOnDestroy(): void {
    if(this.s1) {
      this.s1.unsubscribe();
    }
  }

  changeText(): void {
    if (this.isTaskEdit) {
      this.buttonText = 'Редактировать';
      this.formTitle = 'Редактировать задачу';
    } else {
      this.buttonText = 'Добавить';
      this.formTitle = 'Добавить задачу';
    }
  }

}
