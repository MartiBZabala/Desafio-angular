import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, debounceTime } from 'rxjs/operators';
import { PersonajesService } from './../../services/personajes.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-personaje-list',
  templateUrl: './personaje-list.component.html',
  styleUrls: ['./personaje-list.component.css'],
})
export class PersonajeListComponent implements OnInit {
  personaje: any[] = []; // Lista de personajes
  page = 1; // Página actual
  filterForm: FormGroup; // Formulario de filtros
  statuses: string[] = []; // Opciones de estado
  species: string[] = []; // Opciones de especie
  noResults: string = ''; // Mensaje de no resultados

  constructor(
    private personajesService: PersonajesService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      name: [''],
      status: [''],
      species: [''],
    });
  }

  ngOnInit(): void {
    this.getPersonaje(); // Obtiene la lista inicial de personajes.
    this.getUniqueStatusesAndSpecies(); // Obtiene las opciones únicas de estados y especies.

    this.filterForm.valueChanges
      .pipe(debounceTime(300)) // Aplica un retraso de 300 ms antes de procesar los cambios.
      .subscribe(() => {
        this.page = 1; // Reinicia la página a 1.
        this.getPersonaje(); // Vuelve a obtener los personajes según los nuevos filtros.
      });
  }

  getPersonaje(): void {
    const { name, status, species } = this.filterForm.value;
    this.personajesService
      .getPersonaje(this.page, name, status, species)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener personajes:', error);
          this.noResults = 'Error al obtener personajes.';
          return of({ results: [] }); // Retornamos un objeto con un arreglo vacío
        })
      )
      .subscribe((data) => {
        this.personaje = data.results || []; // Array vacío
        this.noResults =
          this.personaje.length === 0
            ? '🛸 ¡UPS! Personaje no encontrado... "Wubba Lubba Dub Dub!" — Rick'
            : ''; // Verifica si no hay resultados
      });
  }

  getUniqueStatusesAndSpecies(): void {
    this.personajesService.getUniqueStatusesAndSpecies().subscribe((data) => {
      this.statuses = data.statuses;
      this.species = data.species;
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.getPersonaje();
  }
}
