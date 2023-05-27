import {FormControl, Validators} from "@angular/forms";
import {FileHandle} from "./directives/drag-drop.directive";

export class UserCredentials{
  username : string | undefined;
  password : string | undefined;
}

export interface User{
  name:string,
  surname:string,
  birthDate:string,
  username:string,
  email:string,
  password:string,
  email_of_inviter:string|null|undefined,
  phone_number:string
}

export interface TaggedPerson{
  name:string;
  surname:string;
  email:string;
}

export interface FileModel{
  id:string;
  name:string;
  type:string;
  size:number;
  creationDate:Date;
  lastUpdate:Date;
  caption:string;
  taggedPersons?:TaggedPerson[];
  photoAlbum?: PhotoAlbum;
  content?: File;
}

export interface PhotoAlbum{
  id:string;
  name:string;
  photoAlbum?: PhotoAlbum;
  creationDate: Date;
}
