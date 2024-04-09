import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveylistbyclientPopupComponent } from './surveylistbyclient-popup.component';

describe('SurveylistbyclientPopupComponent', () => {
  let component: SurveylistbyclientPopupComponent;
  let fixture: ComponentFixture<SurveylistbyclientPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurveylistbyclientPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveylistbyclientPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
