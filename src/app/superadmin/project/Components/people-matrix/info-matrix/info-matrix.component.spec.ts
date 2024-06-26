import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMatrixComponent } from './info-matrix.component';

describe('InfoMatrixComponent', () => {
  let component: InfoMatrixComponent;
  let fixture: ComponentFixture<InfoMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoMatrixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
