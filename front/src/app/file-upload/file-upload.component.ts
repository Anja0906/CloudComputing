import {Component, Input} from '@angular/core';
import {FileHandle} from "../directives/drag-drop.directive";
import { enviroment } from 'src/enviroments/enviroment';
import { StorageService } from '../services/storage.service';
import { DataService } from '../services/data.service';
import { Album } from '../model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  shortLink: string = "";
  loading: boolean = false;
  file: File = new File([], "");
  album?: Album;
  constructor(private dataService: DataService, private storageService: StorageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['album_id']) {
        this.dataService.getAlbum({album_id: params['album_id']}).subscribe({
          next: album=>{
            this.album = album;
          }
        })
      } else {
        this.dataService.getAlbum({album_id: this.storageService.getUser()['sub']}).subscribe({
          next: album=>{
            this.album = album;
          }
        })
      }
    });
  }

  files: File[] = [];

  filesDropped(files: FileHandle[]): void {
    for (const file1 of files) {
      this.files.push(file1.file);
    }
  }

  async upload(): Promise<void> {
    let params: {TableName: string, Item: any} = {
      TableName: 'Files',
      Item: {
        // 'user_sub': { S: this.storageService.getUser()['sub'] },
      }
    };

    for (const file1 of this.files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e);
        this.dataService.uploadFile({
            name: file1.name,
            type: file1.type,
            data: e.target.result.split(',')[1],
            album_id: this.album?.album_id
        }).subscribe({
          next: file=>{
            console.log(file);
          },
          error: err=>alert(err.error)
        })
      };

      reader.readAsDataURL(file1);
    }

    this.files = []
  }

  onFileInput(fileInput: HTMLInputElement): void {
    // @ts-ignore
    this.files.push(fileInput.files[0]);
  }

  onCancel(file: File) {
    let files: File[] = [];
    for (let i=0; i<this.files.length; i++) {
      if (this.files[i] !== file){
        files.push(this.files[i]);
      }
    }
    this.files = files;
  }

  generateS3Key(filename: string): string {
    const currentDate = new Date().toISOString().substring(0, 10); // Get the current date in yyyy-mm-dd format
    const timestamp = new Date().getTime().toString(); // Get the current timestamp
    const key = `${currentDate}_${timestamp}__${filename}`; // Concatenate the filename, date, and timestamp with underscores as delimiters
    return key;
  }
}
