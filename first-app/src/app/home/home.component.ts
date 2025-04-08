import { Component, inject } from '@angular/core';
import { Housinglocation } from '../housinglocation';
import { HouseLocationComponent } from '../house-location/house-location.component';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HouseLocationComponent,
  ],
  template: `
  <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-house-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation">
      </app-house-location>
    </section>
  `,
  styleUrl: './home.component.css',
})

export class HomeComponent {
 
  housingLocationList: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: Housinglocation[] = [];

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
  
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
