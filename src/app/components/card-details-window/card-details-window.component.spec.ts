import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailsWindowComponent } from './card-details-window.component';

describe('CardDetailsWindowComponent', () => {
  let component: CardDetailsWindowComponent;
  let fixture: ComponentFixture<CardDetailsWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDetailsWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
