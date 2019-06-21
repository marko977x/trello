import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailsSidebarComponent } from './card-details-sidebar.component';

describe('CardDetailsSidebarComponent', () => {
  let component: CardDetailsSidebarComponent;
  let fixture: ComponentFixture<CardDetailsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDetailsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
