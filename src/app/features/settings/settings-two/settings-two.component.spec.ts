import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTwoComponent } from './settings-two.component';

describe('SettingsTwoComponent', () => {
  let component: SettingsTwoComponent;
  let fixture: ComponentFixture<SettingsTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
