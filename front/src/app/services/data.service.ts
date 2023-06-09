import { Injectable } from '@angular/core';
import {UniversalFile, Album} from "../model";
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import { Observable } from 'rxjs';

interface FilesMetas {
    my_files: UniversalFile[],
    shared_files: UniversalFile[]
}

interface AlbumsMetas {
    my_albums: Album[],
    shared_albums: Album[]
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public selectedFile ?: UniversalFile;
  public selectedAlbum ?: Album;

  constructor(private http: HttpClient) {

  }


  getAllFilesMeta(): Observable<FilesMetas> {
    return this.http.get<FilesMetas>(enviroment.lambda.url + '/file');
  }

  getAllAlbums() {
    return this.http.get<AlbumsMetas>(enviroment.lambda.url + '/album');
  }

  getAlbum(album:{album_id: string}){
    return this.http.get<Album & {files: UniversalFile[]}>(enviroment.lambda.url + '/album/' + album.album_id);
  }

  changeAlbum(album:Album){
    return this.http.put<Album>(enviroment.lambda.url + '/album', album);
  }

  deleteAlbum(album:Album){
    return this.http.delete<Album>(enviroment.lambda.url + '/album', {body: album});
  }

  changeFile(selectedItem: UniversalFile): Observable<UniversalFile> {
    return this.http.put<UniversalFile>(enviroment.lambda.url + '/file', selectedItem);
  }

  deleteFile(selectedItem: UniversalFile): Observable<UniversalFile> {
    return this.http.delete<UniversalFile>(enviroment.lambda.url + '/file', {body: selectedItem});
  }

  downloadFile(selectedItem: UniversalFile): Observable<UniversalFile> {
    return this.http.get<UniversalFile>(`${enviroment.lambda.url}/file/${selectedItem.file_id}`);
  }

  uploadFile(item: { name: string; type: string; data: string; album_id: string | undefined }) {
    return this.http.post<UniversalFile>(enviroment.lambda.url + '/file', item);
  }

  createAlbum(name: string): Observable<Album> {
    return this.http.post<Album>(enviroment.lambda.url + '/album', {
      name: name,
    });
  }
}
