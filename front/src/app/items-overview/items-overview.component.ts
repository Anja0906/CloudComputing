import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UniversalFile, Album} from "../model";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-items-overview',
  templateUrl: './items-overview.component.html',
  styleUrls: ['./items-overview.component.css']
})
export class ItemsOverviewComponent {

  myFileModels : UniversalFile[] = [];
  sharedFileModels : UniversalFile[] = [];

  constructor(private router : Router, private dataService:DataService) {
    dataService.getAllFilesMeta().subscribe(
      {
        next: fileModels=>{
          this.myFileModels = fileModels.my_files;
          this.sharedFileModels = fileModels.shared_files;
        },
        error: err=>alert(err.error)
      }
    );
  }

  more(file:UniversalFile) {
    this.dataService.selectedFile = file;
    this.router.navigate(["item-details"])
  }
}
