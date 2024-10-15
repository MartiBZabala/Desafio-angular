import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'desafio-rick-morty';

  // Agregar propiedades
  filterForm: FormGroup;
  personajes: any[] = []; // Cambia 'any' por el tipo adecuado
  page: number = 1; // Página actual

  constructor(private fb: FormBuilder) {
    // Inicializar el formulario
    this.filterForm = this.fb.group({
      name: ['']
    });
  }

  // Método para manejar la búsqueda
  onFilter(): void {
    const filterValue = this.filterForm.value.name;
    // Implementa la lógica de filtrado aquí
    console.log('Filtrando por:', filterValue);
  }

  // Método para manejar el cambio de página
  onPageChange(newPage: number): void {
    this.page = newPage;
    // Implementa la lógica de paginación aquí
    console.log('Cambiando a la página:', newPage);
  }
}
