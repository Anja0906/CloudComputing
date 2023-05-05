import {Component, Input} from '@angular/core';
import {FileUploadService} from "./file-upload-service/file-upload.service";
import {FileHandle} from "../directives/drag-drop.directive";
import { DynamoDbService } from '../services/dynamo-db.service';
import { enviroment } from 'src/enviroments/enviroment';
import { StorageService } from '../services/storage.service';
import { S3Service } from '../services/s3.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  shortLink: string = "";
  loading: boolean = false;
  file: File = new File([], "");
  constructor(private dynamo: DynamoDbService, private storageService: StorageService, private s3: S3Service) { }

  ngOnInit(): void {}

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
        'user_sub': { S: enviroment.sdk.region + ':' + this.storageService.getUser()['sub'] },
      }
    };

    for (const file1 of this.files) {
      console.log(file1);
      const key = this.generateS3Key(file1.name)
      const s3_url = await this.s3.uploadFile(file1, key)
      params.Item = {
        ...params.Item,
        file_id: { S: key},
        size: { S: file1.size.toString()},
        type: { S: file1.type},
        created: { S: Date.now().toString()},
        modified: { S: Date.now().toString()},
        s3_url: { S: s3_url},
      }
      this.dynamo.putItem(params)
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
