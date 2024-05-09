import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatRealityComponent } from './stat-reality.component';

describe('StatRealityComponent', () => {
  let component: StatRealityComponent;
  let fixture: ComponentFixture<StatRealityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatRealityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatRealityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
