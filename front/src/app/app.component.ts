import { Component } from '@angular/core';
import { DynamoDbService } from './services/dynamo-db.service';
import { StorageService } from './services/storage.service';
import { enviroment } from 'src/enviroments/enviroment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';

  constructor() { }
}

