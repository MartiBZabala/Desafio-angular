// Importación de módulos necesarios para el servicio HTTP y programación reactiva.
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // Hacemos que el servicio esté disponible a nivel global.
})
export class PersonajesService {
  private apiUrl = 'https://rickandmortyapi.com/api/character/'; // Endpoint base de la API.

  constructor(private http: HttpClient) {} // Inyectamos HttpClient para hacer peticiones HTTP.

  /**
   * Obtiene personajes según los filtros proporcionados: página, nombre, estado y especie.
   * Si no se proporcionan algunos filtros, se omiten de la consulta.
   */
  getPersonaje(
    page: number,
    name: string = '',
    status: string = '',
    species: string = ''
  ): Observable<any> {
    let params = new HttpParams().set('page', page); // Param de página es obligatorio.

    // Filtros
    if (name) params = params.set('name', name);
    if (status) params = params.set('status', status);
    if (species) params = params.set('species', species);

    // Petición GET con los parámetros configurados.
    return this.http.get<any>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        console.error('Error al obtener personajes:', error);
        return throwError(() => new Error('Error al obtener personajes'));
      })
    );
  }

  /**
   * Obtiene los estados y especies únicos de los personajes.
   * Devuelve dos arreglos: uno con los estados y otro con las especies, sin duplicados.
   */
  getUniqueStatusesAndSpecies(): Observable<{ statuses: string[]; species: string[] }> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data) => {
        const statusesSet = new Set<string>(); // Para almacenar estados únicos.
        const speciesSet = new Set<string>(); // Para almacenar especies únicas.

        // Recorremos los resultados y agregamos los estados y especies a los Sets.
        data.results.forEach((personaje: any) => {
          if (personaje.status) statusesSet.add(personaje.status);
          if (personaje.species) speciesSet.add(personaje.species);
        });

        // Devolvemos los Sets convertidos en arreglos.
        return {
          statuses: Array.from(statusesSet),
          species: Array.from(speciesSet),
        };
      }),
      catchError((error) => {
        console.error('Error al obtener estados y especies:', error);
        return throwError(() => new Error('Error al obtener estados y especies'));
      })
    );
  }
}
