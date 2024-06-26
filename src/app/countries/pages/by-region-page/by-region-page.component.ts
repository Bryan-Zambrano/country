import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = ["Africa", "America", "Asia", "Europe", "Oceania"];
  public selectedRegion?: Region;

  constructor(private _countriesService: CountriesService) { }
  ngOnInit(): void {
    this.selectedRegion = this._countriesService.cachStore.byRegion.region;
    this.countries = this._countriesService.cachStore.byRegion.countries;
  }

  public searchByRegion(region: Region) {
    this.selectedRegion = region;
    this._countriesService.searchByRegion(region).subscribe(
      countries => {
        this.countries = countries;
        //this._countriesService.cachStore.byRegion = { region, countries };
      }
    );

    console.log("Value by Region")
    console.log({ region });
  }

}
