import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent {
  constructor(public dataService : DataService) {
    
  }
}
