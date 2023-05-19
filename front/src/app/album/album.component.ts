import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {FileModel, PhotoAlbum} from "../model";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit{

  files:FileModel[]=[];
  album?: PhotoAlbum;

  constructor(private router : Router, private dataService:DataService) {
  }

  more(file: FileModel) {
    this.dataService.setSelectedFile(file);
    this.router.navigate(["item-details"])
  }

  ngOnInit(): void {
    this.album = this.dataService.getSelectedAlbum();
    this.files = this.dataService.getPhotosForSelectedAlbum();
  }
}
