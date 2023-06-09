import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {UniversalFile, Album} from "../model";
import {Location} from '@angular/common';
import { Observable, concat } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit{

  files:UniversalFile[]=[];
  album?: Album | any;
  changeMode: boolean = false;
  newPerson: string = "";
  filesToRemove: UniversalFile[] = [];

  constructor(private router : Router, private dataService:DataService, private location: Location) {
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

  unshare(person: string): void {
    if (this.album) this.album.shared_with_emails = this.album.shared_with_emails.filter((s: string)=>s!=person);
  }

  share(): void {
    if (!this.newPerson) {
      alert("Must not be empty");
      return;
    }
    this.album?.shared_with_emails.push(this.newPerson);
    this.newPerson = "";
  }

  uploadMoreFiles() {
    this.router.navigateByUrl(`file-upload?album_id=${this.album.album_id}`);
  }

  change(): void {
    let observablesArray: Observable<UniversalFile | Album | any>[] = [];
    if (this.filesToRemove) {
      this.filesToRemove.forEach(file=>{
        console.log('remove', file)
        observablesArray.push(this.dataService.deleteFile(file));
      })
    }
    if (this.album) {
      delete this.album.files_ids; // To avoid race condition
      observablesArray.push(this.dataService.changeAlbum(this.album));
    }
    concat(...observablesArray).subscribe({
      next: (data: UniversalFile | Album | any) => {
        if (data.file_id) this.filesToRemove = this.filesToRemove.filter(f=>f.file_id != data.file_id);
        if (data.album_id) {
          this.changeMode = false;
          this.dataService.getAlbum(data).subscribe(data=>{
            this.album = data as Album;
            this.files = (data as {files: UniversalFile[]}).files;
          })
        }
      },
      error: err=>{
        alert(err.error);
      }
    })
  }

  delete(): void {
    if (this.album) this.dataService.deleteAlbum(this.album).subscribe({
      next: data => {
        this.location.back();
      },
      error: err=>{
        alert(err.error);
      }
    })
  }

  deleteFile(file: UniversalFile) : void {
    this.filesToRemove.push(file);
    this.files = this.files.filter(a=>a.file_id!=file.file_id);
  }
}
