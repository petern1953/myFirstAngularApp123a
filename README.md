Http-kliens használata

file: app.module.ts

1. vegyük fel a HttpClientModule-t
a) import { HttpClientModule } from '@angular/common/http';
b) @NgModule imports: tömbben
    HttpClientModule,

2. saját http-szolgáltatást készítünk: footballService
ng g service service/football

3. football.service.ts-be:
a)
export class FootballService {
  jsonUrl: string =
    'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.clubs.json';

b) importáljuk és 

import { HttpClient } from '@angular/common/http';

c) beinjektáljuk a http-klienst:

  constructor(private http: HttpClient) {
    this.http.get(this.jsonUrl).subscribe(
      list => console.log('football list ', list),
      error => console.log(error),
      () => console.log('complete')
    );
  }

4. a service-t fell kell venni az app.module.ts-ben

import { FootballService } from './service/football.service';

providers: [ FootballService ],

6. app.component.ts-ben:
a) importáljuk és 

import { FootballService } from './service/football.service';

c) beinjektáljuk
  constructor( private fservice: FootballService ) {

----------------------------------------

CRUD megvalósítása saját json-állománnyal, json-szerverrel

----------------------------------------

1. json-server (globális) telepítése, ha még nincs:

npm i -g json-server

2. 
a) json-fájl létrehozása az assets mappa alá, majd a
b) heroes.json fájlba:
{
  "heroes": [
    {
      "id": 1,
      "name": "Lucy",
      "address": "Bp",
      "superpower": "biking"
    }, ... ]}

3. hero.service elkészítése:
ng g service service/hero

4. app.module.ts:
a) be kell importálni
import { HeroService } from './service/hero.service';

b) és elhelyezni a providers tömbben
  providers: [ FootballService, HeroService ],

5. a json-server elindítása:
json-server --watch ./src/assets/heroes.json

6. hero.ts:
hero.id felvétele a Hero osztályba

export class Hero {
  id?: number;

7. hero.service.ts:
a)
jsonUrl: string = 'http://localhost:3000/heroes';

b)
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../model/hero';

c) getAll() metódus:
  constructor( private http: HttpClient ) { }
  
  getAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.jsonUrl)
  }

d) getOne(id) metódus, egy hero lekérése:

  getOne(id: string | number): Observable<Hero> {
    return this.http.get<Hero>(`${this.jsonUrl}/${id}`);
  }

e) add(hero) metódus, egy hero létrehozása:

  add(hero: Hero): Observable<any> {
    return this.http.post<Hero>(this.jsonUrl, hero);
  }

f) update(hero) metódus, hero módosítása:

  update(hero: Hero): Observable<any> {
    return this.http.patch<Hero>(`${this.jsonUrl}/${id}`, hero);
  }

g) remove(hero) metódus, egy hero törlése:

  remove(hero: any): Observable<any> {
    const id = hero.id ? hero.id : hero;
    return this.http.delete(`${this.jsonUrl}/${id}`);
  }
-------------------------
eddig volt az 123, 
az 3. Angular 2 plusz keretrendszer - Ajax és Angular,
mostantól az 123a
az Angular CRUD - alapvető adat-műveletek alapján
-------------------------
8. app.component.ts:
a)
import { HeroService } from './service/hero.service';
b)
constructor módosult
  constructor(
    private fservice: FootballService,
    private hservice: HeroService,
  ) {
    this.hservice.getAll()
      .forEach( value => console.log("All hero: ", value ) );

    this.hservice.getOne( 1 )
      .forEach( value => console.log("First hero: ", value) );

    this.hservice.add({ id: 2, name: "J", address: "Bp.", superpower: "drink" })
      .forEach( value => console.log("Added second hero: ", value) );

    this.hservice.update({ id: 1, name: "K", address: "Deb.", superpower: "d" })
      .forEach( value => console.log("Updated hero 1: ", value) );

    this.hservice.remove( 10 )
      .forEach( value => console.log("Deleted hero 10: ") );
  }

9. hero.service.ts-t módosítani kell (hero: any):
  remove(hero: any): Observable<any> {

10. a json-file-t a src-mappán kívülre kell mozgatni,
különben ciklikusan frissíti magát az alkalmazás
