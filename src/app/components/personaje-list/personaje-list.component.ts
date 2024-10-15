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
  personaje: any[] = []; // Almacena la lista de personajes
  page = 1; // Página actual para la paginación
  filterForm: FormGroup; // Formulario reactivo para filtros
  statuses: string[] = []; // Opciones de estado
  species: string[] = []; // Opciones de especie

  constructor(
    private personajesService: PersonajesService, // Servicio para obtener datos de personajes
    private fb: FormBuilder // Constructor para el FormBuilder
  ) {
    this.filterForm = this.fb.group({ // Inicializa el formulario con controles
      name: [''], // Control para el nombre del personaje
      status: [''], // Control para el estado del personaje
      species: [''], // Control para la especie del personaje
    });
  }

  ngOnInit(): void {
    this.getPersonaje(); // Obtener personajes al iniciar el componente
    this.getUniqueStatusesAndSpecies(); // Obtener estados y especies únicos
    // Suscribirse a los cambios en el formulario
    this.filterForm.valueChanges
      .pipe(debounceTime(300)) // Esperar 300 ms antes de emitir el valor
      .subscribe(() => {
        this.page = 1; // Reiniciar a la primera página cuando cambia cualquier filtro
        this.getPersonaje(); // Llamar a getPersonaje cuando cambia cualquier control del formulario
      });
  }

  // Método para obtener personajes según los filtros aplicados
  getPersonaje(): void {
    const { name, status, species } = this.filterForm.value; // Desestructuración de valores del formulario
    this.personajesService.getPersonaje(this.page, name, status, species).subscribe((data) => {
      this.personaje = data.results; // Actualizar la lista de personajes con los resultados
    });
  }

  // Método para obtener estados y especies únicos
  getUniqueStatusesAndSpecies(): void {
    this.personajesService.getUniqueStatusesAndSpecies().subscribe(data => {
      this.statuses = data.statuses; // Almacenar las opciones de estado
      this.species = data.species; // Almacenar las opciones de especie
    });
  }

  // Método para manejar el cambio de página
  onPageChange(page: number): void {
    this.page = page; // Actualizar la página actual
    this.getPersonaje(); // Llamar a getPersonaje para cargar los personajes de la nueva página
  }
}
