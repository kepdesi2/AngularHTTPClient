import {Component} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  foods;
  countries;

  constructor(private http:HttpClient) {
    this.getFoods();
    this.getCountries();
  }

  getFoods() {
    this.http.get('./assets/productos.json').subscribe(
      // the first argument is a function which runs on success
      data => { this.foods = data},
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading foods')
    );
  }
  createFood(name) {
    let food = {name: name};
    let body = JSON.stringify(food);
    this.http.post('./assets/productos.json', body,).subscribe(
       data => {
         // refresh the list
         this.getFoods();
         return true;
       },
       error => {
         console.error("Error saving food!");
         return Observable.throw(error);
       }
    );
  }

  


















  getCountries() {
    this.http.get('https://restcountries.eu/rest/v2/all').subscribe(
      // the first argument is a function which runs on success
      data => { this.countries = data},
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading foods')
    );
  }

}

