import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { of, delay, finalize } from 'rxjs';

import { InputFormItem, SelectFormItem } from 'containers/base-form';
import { BaseFormComponent } from 'containers/base-form/base-form.component';

const formItems = [
  new InputFormItem({
    formProps: {
      name: 'name',
      defaultValue: '',
      label: 'name',
    },
    itemProps: {
      disabled: false,
      placeholder: '请输入',
    },
    validators: [Validators.required, Validators.minLength(6)],
    errMap: {
      minlength: '至少6位字符',
      required: '必填项',
    },
  }),
  new InputFormItem({
    formProps: {
      name: 'address',
      defaultValue: '',
      label: 'address',
    },
    itemProps: {
      disabled: false,
    },
    hideWhen: (form) => {
      const name = form.get('name')?.value;
      return name === 'test';
    },
    validators: [Validators.required],
    errMap: {
      required: '必填项',
    },
  }),
  new InputFormItem({
    formProps: {
      name: 'age',
      label: 'age',
    },
    itemProps: {
      disabled: false,
    },
    propsGetter: (form  ) => {
      const name = form.get('name')?.value;
      return {
        status: name === '1' ? 'primary' : '',
        disabled: name === '1',
      }
    },
  }),
  new SelectFormItem({
    formProps: {
      name: 'gender',
      label: 'gender',
    },
    itemProps: {
      disabled: false,
      options: [
        {
          value: 1,
          label: '男',
        },
        {
          value: 0,
          label: '女',
        },
      ],
    },
  }),
];

@Component({
  selector: 'app-dynamic-form',
  imports: [BaseFormComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent implements OnInit {
  formItems = formItems;
  formData: any;
  loading = false;

  ngOnInit() {
    this.loading = true;
    of({
      name: 'test',
      address: 'test@example.com',
      age: '20',
      gender: 1,
    })
      .pipe(
        delay(3000),
        finalize(() => { this.loading = false; }),
      )
      .subscribe((res) => {
        this.formData = res;
      })
  }

  handleSubmit = (formData: any) => {
    console.log(formData);
  }
}
