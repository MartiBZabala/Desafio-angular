import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent {
  @Input() paginaActual!: number;
  @Input() totalPaginas: number = 43;
  @Output() cambioDePagina = new EventEmitter<number>();

  paginasVisibles: number[] = [];

  ngOnInit(): void {
    this.actualizarPaginasVisibles();
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.cambioDePagina.emit(pagina);
    this.actualizarPaginasVisibles();
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.cambiarPagina(this.paginaActual - 1);
    }
  }

  siguientePagina(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.cambiarPagina(this.paginaActual + 1);
    }
  }

  private actualizarPaginasVisibles(): void {
    const paginasPorLado = 2; // Cuántas páginas mostrar antes y después de la actual
    const inicio = Math.max(1, this.paginaActual - paginasPorLado);
    const fin = Math.min(this.totalPaginas, this.paginaActual + paginasPorLado);

    this.paginasVisibles = Array.from({ length: fin - inicio + 1 }, (_, i) => i + inicio);
  }
}
