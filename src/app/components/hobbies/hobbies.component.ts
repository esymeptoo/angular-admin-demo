import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  FormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormGroup,
  FormArray,
  FormControl,
  Validators, AbstractControl,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { of } from 'rxjs';

import { ThemeModule } from '@theme/theme.module';

@Component({
  selector: 'app-hobbies',
  imports: [NgFor, NgIf, ThemeModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.css',
})
export class HobbiesComponent implements OnInit {
  @Input() form!: FormGroup;

  get hobbiesArray() {
    return this.form.get('hobbies') as FormArray;
  }

  toArray(arr: FormArray) {
    return arr.controls as FormGroup[];
  }

  handleAdd() {
    this.hobbiesArray.push(new FormGroup({
      text: new FormControl('', [Validators.required]),
    }));
  }

  handleDelete(index: number) {
    if (this.hobbiesArray.length > 1) this.hobbiesArray.removeAt(index);
  }

  ngOnInit() {}
}
