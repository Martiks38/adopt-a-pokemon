import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPokemonsComponent } from './view-pokemons.component';

describe('ViewPokemonsComponent', () => {
  let component: ViewPokemonsComponent;
  let fixture: ComponentFixture<ViewPokemonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPokemonsComponent]
    });
    fixture = TestBed.createComponent(ViewPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
