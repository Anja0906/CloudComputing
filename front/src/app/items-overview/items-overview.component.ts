import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FileModel, PhotoAlbum, TaggedPerson} from "../model";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-items-overview',
  templateUrl: './items-overview.component.html',
  styleUrls: ['./items-overview.component.css']
})
export class ItemsOverviewComponent {

  fileModels : FileModel[] = [];

  constructor(private router : Router, private dataService:DataService) {
    this.fileModels = dataService.getAllFiles();
  }

  more(file:FileModel) {
    this.dataService.setSelectedFile(file);
    this.router.navigate(["item-details"])
  }
}
