import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonajeListComponent } from './personaje-list.component';

describe('PersonajeListComponent', () => {
  let component: PersonajeListComponent;
  let fixture: ComponentFixture<PersonajeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonajeListComponent]
    });
    fixture = TestBed.createComponent(PersonajeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
