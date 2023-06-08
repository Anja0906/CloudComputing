import {Component, OnInit} from '@angular/core';
import {UniversalFile} from "../model";
import {DataService} from "../services/data.service";
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit{

  selectedItem!: UniversalFile;
  changeMode: boolean = false;
  newPerson: string = "";
  file?: File;
  imgUrl: string = "https://material.angular.io/assets/img/examples/shiba2.jpg";

  constructor(private dataService:DataService, private location: Location) {
  }

  ngOnInit(){
    this.selectedItem = JSON.parse(JSON.stringify(this.dataService.selectedFile));
    this.dataService.downloadFile(this.selectedItem).subscribe({
      next: file=>{
        this.selectedItem = file;
        if (file.type.includes('image')) this.imgUrl = `data:${file.type};base64, ${file.data}`;
      }
    });
  }

  change() {
    if (!this.file) {
      this.dataService.changeFile(this.selectedItem).subscribe({
        next: (item)=>{
          this.selectedItem = item;
          this.changeMode = false;
        },
        error: err=>alert(err.error)
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedItem.type = this.file?.type ?? '';
      this.selectedItem.data = e.target.result.split(',')[1];
      this.dataService.changeFile(this.selectedItem).subscribe({
        next: file=>{
          if (this.selectedItem.type.includes('image')) this.imgUrl = `data:${this.selectedItem.type};base64, ${this.selectedItem.data}`;
          this.selectedItem = file;
          this.changeMode = false;
        },
        error: err=>alert(err.error)
      })
    };
  
    reader.readAsDataURL(this.file);
  }

  delete() {
    this.dataService.deleteFile(this.selectedItem).subscribe({
      next: f=>{
        this.location.back();
      },
      error: err=>{alert(err.error)}
    });
  }

  download() {
    const src = `data:${this.selectedItem.type};base64,${this.selectedItem.data}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = this.selectedItem.name;
    link.click();
    link.remove();
  }

  makeNewAlbum() {
    this.dataService.makeNewAlbum(this.selectedItem);
  }

  unshare(email: string) {
    this.selectedItem.shared_with_emails = this.selectedItem.shared_with_emails.filter(e=>e != email);
  }
  
  upload(event: Event) {
    this.file = (event as any).target.files[0];
    this.selectedItem.size = this.file?.size ?? 0;
    console.log(this.file);
  }

  share() {
    if(!this.selectedItem.shared_with_emails) this.selectedItem.shared_with_emails = [];
    
    this.selectedItem.shared_with_emails.push(this.newPerson);
    this.newPerson = "";
  }
}
