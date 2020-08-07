import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'edm-group-add-edit',
  templateUrl: './group-add-edit.component.html',
  styleUrls: ['./group-add-edit.component.css']
})
export class GroupAddEditComponent implements OnInit, OnChanges {

  buttonText = 'Добавить';
  formTitle = 'Добавить группу';
  form: FormGroup;
  @Input() isGroupEdit: boolean;

  constructor() { }

  ngOnInit(): void {
    this.changeText();

    if(this.isGroupEdit) {
      this.form = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      });
    } else {
      this.form = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      });
    }
  }

  submit() {

    let title = this.form.value;
  }

  ngOnChanges() {
    this.changeText();
  }

  changeText(): void {
    if (this.isGroupEdit) {
      this.buttonText = 'Редактировать';
      this.formTitle = 'Редактировать группу';
    } else {
      this.buttonText = 'Добавить';
      this.formTitle = 'Добавить группу';
    }
  }

}
