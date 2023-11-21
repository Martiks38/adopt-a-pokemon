import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPaginationComponent } from './panel-pagination.component';

describe('PanelPaginationComponent', () => {
  let component: PanelPaginationComponent;
  let fixture: ComponentFixture<PanelPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelPaginationComponent]
    });
    fixture = TestBed.createComponent(PanelPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
