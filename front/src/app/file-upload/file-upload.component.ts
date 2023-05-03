import {Component, Input} from '@angular/core';
import {FileUploadService} from "./file-upload-service/file-upload.service";
import {FileHandle} from "../directives/drag-drop.directive";


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  shortLink: string = "";
  loading: boolean = false;
  file: File = new File([], "");
  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {}

  files: FileHandle[] = [];

  filesDropped(files: FileHandle[]): void {
    for (const file1 of files) {
      this.files.push(file1);
    }
  }

  upload(): void {
    for (const file1 of this.files) {
      console.log(this.file);
    }
  }

  onFileInput(fileInput: HTMLInputElement): void {
    // @ts-ignore
    this.files.push(fileInput.files[0]);
  }

  onCancel(file: FileHandle) {
    let files: FileHandle[] = [];
    for (let i=0; i<this.files.length; i++) {
      if (this.files[i] !== file){
        files.push(this.files[i]);
      }
    }
    this.files = files;
  }
}
