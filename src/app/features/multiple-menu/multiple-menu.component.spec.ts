import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleMenuComponent } from './multiple-menu.component';

describe('MultipleMenuComponent', () => {
  let component: MultipleMenuComponent;
  let fixture: ComponentFixture<MultipleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
