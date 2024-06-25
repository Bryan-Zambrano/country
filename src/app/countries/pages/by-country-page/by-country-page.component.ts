import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  public countries: Country[] = [];

  constructor(private _countriesService: CountriesService) { }

  public searchByCountry(value: string) {

    this._countriesService.searchByCountry(value).subscribe(
      countries => {
        this.countries = countries;
      }
    );

    console.log("Value by Country")
    console.log({ value });
  }

}
