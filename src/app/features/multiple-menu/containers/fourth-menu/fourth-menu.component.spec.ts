import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthMenuComponent } from './fourth-menu.component';

describe('FourthMenuComponent', () => {
  let component: FourthMenuComponent;
  let fixture: ComponentFixture<FourthMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourthMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourthMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
