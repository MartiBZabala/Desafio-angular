import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent {
  @Input() paginaActual!: number;
  @Output() cambioDePagina = new EventEmitter<number>();

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.cambioDePagina.emit(this.paginaActual - 1);
    }
  }

  siguientePagina(): void {
    this.cambioDePagina.emit(this.paginaActual + 1);
  }
}
