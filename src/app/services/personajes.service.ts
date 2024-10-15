import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  private apiUrl = 'https://rickandmortyapi.com/api/character/';
  constructor(private http: HttpClient) {}

  getPersonaje(page: number, name: string = '', status: string = '', species: string = ''): Observable<any> {
    let params = new HttpParams().set('page', page);
    if (name) {
      params = params.set('name', name);
    }
    if (status) {
      params = params.set('status', status);
    }
    if (species) {
      params = params.set('species', species);
    }
    return this.http.get<any>(this.apiUrl, { params });
  }

  getUniqueStatusesAndSpecies(): Observable<{ statuses: string[], species: string[] }> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data) => {
        const statusesSet = new Set<string>();
        const speciesSet = new Set<string>();
        data.results.forEach((personaje: any) => {
          if (personaje.status) statusesSet.add(personaje.status);
          if (personaje.species) speciesSet.add(personaje.species);
        });
        return {
          statuses: Array.from(statusesSet),
          species: Array.from(speciesSet),
        };
      })
    );
  }
}
