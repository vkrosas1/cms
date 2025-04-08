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
        <input type="text" placeholder="Filter by city">
        <button class="primary" type="button">Search</button>
      </form>
    </section>
    <section class="results">
      <app-house-location
        *ngFor="let housingLocation of housingLocationList"
        [housingLocation]="housingLocation">
      </app-house-location>
    </section>
  `,
  styleUrl: './home.component.css',
})

export class HomeComponent {
 
  housingLocationList: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }
}
