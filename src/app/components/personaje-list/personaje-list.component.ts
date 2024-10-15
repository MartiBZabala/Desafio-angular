import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { PersonajesService } from './../../services/personajes.service';

@Component({
  selector: 'app-personaje-list',
  templateUrl: './personaje-list.component.html',
  styleUrls: ['./personaje-list.component.css']
})
export class PersonajeListComponent implements OnInit {
  personaje: any[] = [];
  page = 1;
  filterForm: FormGroup;
  statuses: string[] = []; // Opciones de estado
  species: string[] = []; // Opciones de especie

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
    this.getPersonaje();
    this.getUniqueStatusesAndSpecies(); // Obtener estados y especies

    // Suscribirse a los cambios del formulario
    this.filterForm.valueChanges
      .pipe(debounceTime(300)) // Espera 300 ms antes de emitir el valor
      .subscribe(() => {
        this.page = 1; // Reiniciar a la primera página
        this.getPersonaje(); // Llamar a getPersonaje cuando cambia cualquier control del formulario
      });
  }

  getPersonaje(): void {
    const { name, status, species } = this.filterForm.value;
    this.personajesService.getPersonaje(this.page, name, status, species).subscribe((data) => {
      this.personaje = data.results;
    });
  }

  getUniqueStatusesAndSpecies(): void {
    this.personajesService.getUniqueStatusesAndSpecies().subscribe(data => {
      this.statuses = data.statuses;
      this.species = data.species;
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.getPersonaje();
  }
}
