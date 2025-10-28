import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyDetailComponent } from './difficulty-detail.component';

describe('DifficultyDetailComponent', () => {
  let component: DifficultyDetailComponent;
  let fixture: ComponentFixture<DifficultyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifficultyDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifficultyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
