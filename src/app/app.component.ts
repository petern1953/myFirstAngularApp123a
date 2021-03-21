import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from './model/hero';
import { FootballService } from './service/football.service';
import { HeroService } from './service/hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Greeniland';
  myHero: Hero = {
    name: 'Magneto',
    address: 'New York',
    superpower: 'hard'
  };
  listObservable: Observable<any> = new Observable();

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
}
