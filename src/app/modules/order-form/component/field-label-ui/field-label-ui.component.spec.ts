import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldLabelUiComponent } from './field-label-ui.component';

describe('FieldLabelUiComponent', () => {
  let component: FieldLabelUiComponent;
  let fixture: ComponentFixture<FieldLabelUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldLabelUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldLabelUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
