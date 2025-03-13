import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdMenuComponent } from './third-menu.component';

describe('ThirdMenuComponent', () => {
  let component: ThirdMenuComponent;
  let fixture: ComponentFixture<ThirdMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
