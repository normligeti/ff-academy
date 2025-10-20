import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pillar1Component } from './pillar-1.component';

describe('Pillar1Component', () => {
  let component: Pillar1Component;
  let fixture: ComponentFixture<Pillar1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pillar1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pillar1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
