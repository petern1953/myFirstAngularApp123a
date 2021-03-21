import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../model/hero';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  jsonUrl: string = 'http://localhost:3000/heroes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.jsonUrl);
  }

  getOne(id: string | number): Observable<Hero> {
    return this.http.get<Hero>(`${this.jsonUrl}/${id}`);
  }

  add(hero: Hero): Observable<any> {
    return this.http.post<Hero>(this.jsonUrl, hero);
  }

  update(hero: Hero): Observable<any> {
    return this.http.patch<Hero>(`${this.jsonUrl}/${hero.id}`, hero);
  }

  remove(hero: Hero): Observable<any> {
    const id = hero.id ? hero.id : hero;
    return this.http.delete(`${this.jsonUrl}/${id}`);
  }
}
