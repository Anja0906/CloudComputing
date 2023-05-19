import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PhotoAlbum} from "../model";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-all-albums',
  templateUrl: './all-albums.component.html',
  styleUrls: ['./all-albums.component.css']
})
export class AllAlbumsComponent implements OnInit{

  albums:PhotoAlbum[] = []
  constructor(private router:Router, private dataService : DataService) {

  }

  more(album: PhotoAlbum) {
    this.dataService.setSelectedAlbum(album);
    this.router.navigate(["album"])
  }

  newAlbum() {
  }

  ngOnInit(): void {
    this.dataService.getAllFiles();
    this.albums = this.dataService.getAllAlbums()
  }
}
