import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumChartComponent } from './hum-chart.component';

describe('HumChartComponent', () => {
  let component: HumChartComponent;
  let fixture: ComponentFixture<HumChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
