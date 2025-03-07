import { FormGroup, ValidatorFn } from '@angular/forms';
import { NbComponentSize, NbComponentShape, NbComponentStatus } from '@nebular/theme';

export enum FormItemType {
  Input = 'Input',
  Select = 'Select',
}

type FormProps = {
  name: string;
  label?: string;
  defaultValue?: unknown;
}

export type BaseFormItemType = {
  formProps: FormProps;
  hideWhen?: (form: FormGroup) => boolean;
  propsGetter?: (form: FormGroup) => Record<string, any>;
  validators?: ValidatorFn | ValidatorFn[] | null;
  errMap?: Record<string, any>;
}

class BaseFormItem {
  // type: string = 'Form-Item';
  formProps: BaseFormItemType['formProps'];
  hideWhen: BaseFormItemType['hideWhen'];
  propsGetter: BaseFormItemType['propsGetter'];
  validators: BaseFormItemType['validators'];
  errMap: BaseFormItemType['errMap'];

  constructor(options: BaseFormItemType) {
    const { formProps, hideWhen, propsGetter, validators, errMap } = options;
    this.formProps = formProps;
    this.hideWhen = hideWhen;
    this.propsGetter = propsGetter;
    this.validators = validators;
    this.errMap = errMap;
  }
}

type BasicFormItemType<T> = {
  itemProps?: Partial<T>;
}

export type IFormItems = BaseFormItemType & BasicFormItemType<Record<string, unknown>> & { type: FormItemType };

type InputFormItemType = BasicFormItemType<{
  type?: 'text' | 'password' | 'email' | 'password_confirmation';
  fieldSize?: NbComponentSize;
  status?: NbComponentStatus;
  shape?: NbComponentShape;
  disabled?: boolean;
  placeholder?: string;
}>;

export class InputFormItem extends BaseFormItem {
  type = FormItemType.Input;
  itemProps: InputFormItemType['itemProps'];
  constructor(options: BaseFormItemType & InputFormItemType) {
    const { itemProps, ...rest } = options;
    super(rest);
    this.itemProps = itemProps;
  }
}

type SelectFormItemType = BasicFormItemType<{
  disabled?: boolean;
  placeholder?: string;
  options: {
    value: unknown;
    label: string;
  }[];
}>;

export class SelectFormItem extends BaseFormItem {
  type = FormItemType.Select;
  itemProps: InputFormItemType['itemProps'];
  constructor(options: BaseFormItemType & SelectFormItemType) {
    const { itemProps, ...rest } = options;
    super(rest);
    this.itemProps = itemProps;
  }
}
