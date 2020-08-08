import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Group } from '../common/model/group.model';
import { TaskService } from '../common/service/task.service';

@Component({
  selector: 'edm-group-add-edit',
  templateUrl: './group-add-edit.component.html',
  styleUrls: ['./group-add-edit.component.css']
})
export class GroupAddEditComponent implements OnInit, OnDestroy {

  buttonText = 'Добавить';
  formTitle = 'Добавить группу';
  group: Group;
  form: FormGroup;
  @Input() isGroupEdit: boolean;
  @Input() groupId: number;
  @Output() renderGroups = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<any>();
  s1: Subscription;
  s2: Subscription;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.changeText();

    if(this.isGroupEdit) {
      this.setEditGroup(this.groupId);
    } else {
      this.form = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(4)]),
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

  public submit(): void {
    if (this.isGroupEdit) {
      const title = this.form.value.title;
      const group: Group = {title};

      this.s1 = this.taskService.updateGroup(this.group.id, group)
        .subscribe(() => {
          this.renderGroups.emit();
          this.closePopup.emit();
        });
    } else {
      const title = this.form.value.title;
      const group: Group = {title};

      this.s1 = this.taskService.addGroup(group)
        .subscribe(() => {
          this.renderGroups.emit();
          this.closePopup.emit();
        });
    }
  }

  private setEditGroup(id: number): void {
    this.s2 = this.taskService.getGroup(id)
      .subscribe((group) => {
        this.group = group;

        this.form = new FormGroup({
          title: new FormControl(this.group.title, [Validators.required, Validators.minLength(4)]),
        });
      });
  }

  private changeText(): void {
    if (this.isGroupEdit) {
      this.buttonText = 'Редактировать';
      this.formTitle = 'Редактировать группу';
    } else {
      this.buttonText = 'Добавить';
      this.formTitle = 'Добавить группу';
    }
  }

}
