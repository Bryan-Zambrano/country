import { Component, EventEmitter, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor(private _countriesService: CountriesService) { }

  public searchByCapital(value: string) {

    this._countriesService.searchByCapital(value).subscribe(
      countries => {
        this.countries = countries;
      }
    );

    console.log("Value by Capital")
    console.log({ value });
  }

}
