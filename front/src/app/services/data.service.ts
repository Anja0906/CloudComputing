import { Injectable } from '@angular/core';
import {FileModel, PhotoAlbum, TaggedPerson} from "../model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private selectedFile ?: FileModel;
  private selectedAlbum ?: PhotoAlbum;
  private fileModels:FileModel[] = [];
  private albumFiles:FileModel[] = [];
  private albums:PhotoAlbum[] = [];

  constructor() { }

  getAllFiles(){
    for (let i = 1; i <= 10; i++) {
      const taggedPerson: TaggedPerson = {
        name: 'Person ' + i,
        surname: 'Surname ' + i,
        email: 'person' + i + '@example.com'
      };

      const photoAlbum: PhotoAlbum = {
        id: 'album-' + i,
        name: 'Album ' + i,
        photoAlbum: undefined,
        creationDate: new Date()
      };

      const file: FileModel = {
        id: 'file-' + i,
        name: 'File ' + i,
        type: 'Type ' + i,
        size: i * 1024, // Size in bytes
        creationDate: new Date(),
        lastUpdate: new Date(),
        caption: 'Caption ' + i,
        taggedPersons: [taggedPerson],
        photoAlbum: photoAlbum,
        content: undefined
      };

      this.fileModels.push(file);
    }
    return this.fileModels;
  }

  getSelectedFile(){
    return this.selectedFile;
  }

  setSelectedFile(file:FileModel){
    this.selectedFile = file;
  }

  getSelectedAlbum(){
    return this.selectedAlbum;
  }

  setSelectedAlbum(album:PhotoAlbum){
    this.selectedAlbum = album;
    for (let fileModel of this.fileModels) {
      if (album.name===fileModel.photoAlbum?.name){
        this.albumFiles.push(fileModel);
      }
    }
  }

  getPhotosForSelectedAlbum(){
    return this.albumFiles;
  }

  getAllAlbums(){
    for (let fileModel of this.fileModels) {
      if (fileModel.photoAlbum) {
        this.albums.push(fileModel.photoAlbum)
      }
    }
    return this.albums;
  }

  changeFile(selectedItem: FileModel) {

  }

  deleteFile(selectedItem: FileModel) {

  }

  downloadFile(selectedItem: FileModel) {

  }

  makeNewAlbum(selectedItem: FileModel) {

  }
}
