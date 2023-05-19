import {Component, OnInit} from '@angular/core';
import {FileModel} from "../model";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit{

  selectedItem!: FileModel | undefined;

  constructor(private dataService:DataService) {
  }

  ngOnInit(){
    this.selectedItem = this.dataService.getSelectedFile();
  }

  change(selectedItem: FileModel) {
    this.dataService.changeFile(selectedItem);
  }

  delete(selectedItem: FileModel) {
    this.dataService.deleteFile(selectedItem);
  }

  download(selectedItem: FileModel) {
    this.dataService.downloadFile(selectedItem);
  }

  makeNewAlbum(selectedItem: FileModel) {
    this.dataService.makeNewAlbum(selectedItem);
  }
}
