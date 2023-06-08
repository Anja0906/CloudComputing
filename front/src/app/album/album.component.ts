import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {UniversalFile, Album} from "../model";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit{

  files:UniversalFile[]=[];
  album?: Album;

  constructor(private router : Router, private dataService:DataService) {
  }

  more(file: UniversalFile) {
    this.dataService.selectedFile = file;
    this.router.navigate(["item-details"])
  }

  ngOnInit(): void {
    if (this.dataService.selectedAlbum) this.dataService.getAlbum(this.dataService.selectedAlbum).subscribe(data=>{
      this.album = data as Album;
      this.files = (data as {files: UniversalFile[]}).files;
    })
  }
}
