import {Component, Input} from '@angular/core';
import {FileUploadService} from "./file-upload-service/file-upload.service";
import {FileHandle} from "../directives/drag-drop.directive";
import { DynamoDbService } from '../services/dynamo-db.service';
import { enviroment } from 'src/enviroments/enviroment';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  shortLink: string = "";
  loading: boolean = false;
  file: File = new File([], "");
  constructor(private fileUploadService: FileUploadService, private dynamo: DynamoDbService, private storageService: StorageService) { }

  ngOnInit(): void {}

  files: FileHandle[] = [];

  filesDropped(files: FileHandle[]): void {
    for (const file1 of files) {
      this.files.push(file1);
    }
  }

  upload(): void {
    let params: {TableName: string, Item: any} = {
      TableName: 'Files',
      Item: {
        // 'user_sub': { S: this.storageService.getUser()['sub'] },
        'user_sub': { S: enviroment.sdk.region + ':' + this.storageService.getUser()['sub'] },
      }
    };

    for (const file1 of this.files) {
      console.log(file1);
      params.Item = {
        ...params.Item,
        file_id: { S: file1.name + " $ " + Date.now().toString()},
        size: { S: file1.size.toString()},
        type: { S: ((file1 as unknown) as {type: any})['type']},
        created: { S: Date.now().toString()},
        modified: { S: Date.now().toString()},
      }
      this.dynamo.putItem(params)
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
