import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from './model/hero';
import { FootballService } from './service/football.service';

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

  constructor( private fservice: FootballService ) {
    this.listObservable = new Observable(observer => {
      let to = setTimeout(() => {
        observer.next("Megjöttem...");
      }, 3000);

      let to1 = setTimeout(() => {
        if (Math.random() > .75) {
          observer.error("error");
        } else {
          console.log("error free");
        };
       }, 3500);

      let to2 = setTimeout(() => {
        observer.complete();
       }, 4000);
    });

    this.listObservable.subscribe(
      value => console.log(value),
      error => console.error(error),
      () => console.log("complete")
    );
  }
}
