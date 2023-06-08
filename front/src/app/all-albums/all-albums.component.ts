import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Album} from "../model";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-all-albums',
  templateUrl: './all-albums.component.html',
  styleUrls: ['./all-albums.component.css']
})
export class AllAlbumsComponent implements OnInit{
  myAlbums: Album[] = [];
  sharedAlbums: Album[] = [];

  constructor(private router:Router, private dataService : DataService) {

  }

  more(album: Album) {
    this.dataService.selectedAlbum  = album;
    this.router.navigate(["album"])
  }

  newAlbum() {
  }

  ngOnInit(): void {
    this.dataService.getAllFilesMeta();
    this.dataService.getAllAlbums().subscribe(data=>{
      this.myAlbums = data.my_albums;
      this.sharedAlbums = data.shared_albums;
    })
  }
}
