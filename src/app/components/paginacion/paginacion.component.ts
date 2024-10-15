import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent {
  //Recibo la página actual
  @Input() paginaActual!: number;
  //Envio la Página Actual
  @Output() cambioDePagina = new EventEmitter<number>();

  //Funcion para navegar en las paginas
  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.cambioDePagina.emit(this.paginaActual - 1);
    }
  }
  siguientePagina(): void {
    this.cambioDePagina.emit(this.paginaActual + 1);
  }
}
