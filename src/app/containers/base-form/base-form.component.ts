import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgSwitch, NgSwitchCase } from '@angular/common';
// @ts-ignore
import _ from 'lodash';

import { ThemeModule } from '@theme/theme.module';

import { FormItemType, IFormItems } from './';

@Component({
  selector: 'app-base-form',
  imports: [ThemeModule, FormsModule, CommonModule, NgSwitch, NgSwitchCase, ReactiveFormsModule],
  templateUrl: './base-form.component.html',
  styleUrl: './base-form.component.css',
})
export class BaseFormComponent implements OnInit, OnChanges {
  @Input() formItems: IFormItems[] = [];
  @Input() formData: any;
  @Input() loading: boolean = false;
  @Output() onSubmit = new EventEmitter();

  FormItemType = FormItemType;
  form!: FormGroup;
  formItemsProps: Record<string, Record<string, any> & { isHidden?: boolean }> = {};
  hideMap: Map<string, { prev: boolean; current: boolean }> = new Map();
  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    // this.cdr.detach();
  }

  get errorMessage(): Record<string, string> {
    return this.formItems.reduce((a, b) => {
      const { formProps: { name }, errMap } = b;
      if (!errMap) return a;
      const error = this.form.get(name)?.errors;
      if (!error) return a;
      const firstError = Object.keys(errMap).filter((key) => error[key])?.[0];
      if (!firstError) return a;
      return {
        ...a,
        [name]: errMap[firstError],
      }
    }, {});
  }

  initForm = () => {
    this.form = this.formBuilder.group(
      this.formItems.reduce((a, b) => {
        const {
          formProps: { name, defaultValue },
          itemProps,
          validators = [],
        } = b;
        return {
          ...a,
          [name]: [
            {
              value: defaultValue || '',
              // 设置formControlName后无法在html设置disabled属性
              // TODO: 列出所有不支持修改的属性
              disabled: !!itemProps?.['disabled'],
            },
            validators,
          ],
        }
      }, {})
    );

    this.formItemsProps = this.formItems.reduce((a, b) => {
      const {
        formProps: { name },
        itemProps,
        propsGetter = () => ({}),
        hideWhen,
      } = b;
      const hidden = hideWhen?.(this.form) || false;
      this.hideMap.set(name, {
        prev: hidden,
        current: hidden,
      });
      return {
        ...a,
        [name]: {
          // 同上
          ..._.omit((itemProps || {}), 'disabled'),
          ...propsGetter(this.form),
          isHidden: hidden,
        },
      }
    }, {});

    // 处理动态 propsGetter和hideWhen
    this.form.valueChanges.subscribe((values) => {
      this.formItems.forEach((item) => {
        const { propsGetter, formProps: { name, defaultValue }, hideWhen } = item;
        const props = propsGetter?.(this.form) || {};
        if ('disabled' in props) {
          if (props['disabled']) this.form.get(name)?.disable({ emitEvent: false });
          else this.form.get(name)?.enable({ emitEvent: false });
        }
        const hidden = hideWhen?.(this.form) || false;
        this.formItemsProps[name] = {
          ...this.formItemsProps[name],
          ...props,
          isHidden: hidden,
        }
        this.hideMap.set(name, {
          prev: !!this.hideMap.get(name)?.current,
          current: hidden,
        });
        this.handleHideAndShow(name, hidden, defaultValue);
      });
    });
  }

  handleHideAndShow(name: string, hide: boolean, defaultValue: unknown) {
    const { prev, current } = this.hideMap.get(name) || {};
    if (prev === current) return;
    const control = this.form.get(name);
    if (!control) return;
    control.clearValidators();
    if (hide) {
      control.setValue(defaultValue, { emitEvent: false });
    } else {
      const validators = this.formItems.find(({ formProps }) => formProps.name === name)?.validators
      if (validators) control.addValidators(validators);
    }
    control.updateValueAndValidity({ emitEvent: false });
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { formData: { previousValue, currentValue } } = changes;
    if (!previousValue && currentValue) {
      this.form.patchValue(currentValue);
    }
  }

  handleSubmit = () => {
    this.onSubmit.emit(this.form.value);
  }
}
