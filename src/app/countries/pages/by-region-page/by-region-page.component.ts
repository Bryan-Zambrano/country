import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public countries: Country[] = [];

  constructor(private _countriesService: CountriesService) { }

  public searchByRegion(value: string) {

    this._countriesService.searchByRegion(value).subscribe(
      countries => {
        this.countries = countries;
      }
    );

    console.log("Value by Country")
    console.log({ value });
  }

}
