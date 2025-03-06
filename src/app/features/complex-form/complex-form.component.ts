import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { Subject, of, delay, tap, finalize } from 'rxjs';

import { ThemeModule } from '@theme/theme.module';
import { HobbiesComponent } from 'components/hobbies/hobbies.component';

const genDefaultForm = () => ({
  name: '',
  age: '',
  gender: 1,
  hobbies: ['钓鱼'],
  // 是否骑行
  isCycling: 1,
  bikeBrandName: '',
});

const initStream = ({ onStart, onEnd }: { onStart: () => void; onEnd: () => void; }) => {
  return of(genDefaultForm()).pipe(
    tap(() => { onStart() }),
    delay(1000),
    finalize(() => { onEnd() }),
  );
}

@Component({
  selector: 'app-complex-form',
  imports: [
    NgIf,
    CommonModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioGroup,
    MatRadioButton,
    HobbiesComponent,
  ],
  templateUrl: './complex-form.component.html',
  styleUrl: './complex-form.component.css'
})
export class ComplexFormComponent implements OnInit {
  form!: FormGroup;
  waitFormReady = new Subject();
  waitFormReady$ = this.waitFormReady.asObservable();
  loading = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
    this.waitFormReady$.subscribe((ready) => {
      if (ready) this.initFormValuesChange();
    });
  }

  initFormValuesChange = () => {
    this.form.valueChanges.subscribe((values) => {
      const { gender, isCycling } = values;
      const bikeBrandNameControl = this.form.get('bikeBrandName');
      if (gender === 1 && isCycling === 1) {
        bikeBrandNameControl?.addValidators([Validators.required]);
      } else {
        bikeBrandNameControl?.clearValidators();
        bikeBrandNameControl?.setValue('', { emitEvent: false });
      }
      bikeBrandNameControl?.updateValueAndValidity({ emitEvent: false });
    });
  }

  buildForm() {
    initStream({
      onStart: () => { this.loading = true; },
      onEnd: () => { this.loading = false; },
    })
      .subscribe((values) => {
        this.form = this.formBuilder.group({
          name: [values.name, Validators.required],
          age: [values.age, Validators.required],
          gender: values.gender,
          hobbies: this.formBuilder.array(values.hobbies.map((item) => {
            return this.formBuilder.group({
              text: [item, Validators.required],
            })
          })),
          isCycling: values.isCycling,
          bikeBrandName: [values.bikeBrandName, Validators.required],
        });
        this.waitFormReady.next(true);
      });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
