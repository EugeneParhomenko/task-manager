import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Group } from '../common/model/group.model';
import { TaskService } from '../common/service/task.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

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
  @Output() renderGroups = new EventEmitter<number>();
  @Output() closePopup = new EventEmitter<any>();

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

  ngOnDestroy(): void {}

  public submit(): void {
    if (this.isGroupEdit) {
      const title = this.form.value.title;
      const group: Group = {title};

      this.taskService.updateGroup(this.group.id, group).pipe(untilDestroyed(this))
        .subscribe(() => {
          this.renderGroups.emit(this.groupId);
          this.closePopup.emit();
        });
    } else {
      const title = this.form.value.title;
      const group: Group = {title};

      this.taskService.addGroup(group).pipe(untilDestroyed(this))
        .subscribe(() => {
          this.renderGroups.emit(this.groupId);
          this.closePopup.emit();
        });
    }
  }

  private setEditGroup(id: number): void {
    this.taskService.getGroup(id).pipe(untilDestroyed(this))
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
