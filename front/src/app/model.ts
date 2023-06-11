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

// export interface UniversalFile{
//   id:string;
//   name:string;
//   type:string;
//   size:number;
//   creationDate:Date;
//   lastUpdate:Date;
//   caption:string;
//   taggedPersons?:TaggedPerson[];
//   Album?: Album;
//   content?: File;
// }

export interface UniversalFile {
  user_sub: string;
  file_id: string;
  name: string;
  type: string;
  size: number;
  creation_date: string;
  last_update: string;
  shared_with_emails: string[];
  album_id: string;
  data: string | undefined;
  s3_url: string | undefined;
}

// export interface Album{
//   id:string;
//   name:string;
//   Album?: Album;
//   creationDate: Date;
// }

export interface Album {
  user_sub: string;
  album_id: string;
  name: string;
  creation_date: string;
  last_update: string;
  shared_with_emails: string[];
  files_ids: string[];
}

export interface FamilyInvite {
  invited_email: string;
  inviter_email: string;
  invited_name: string;
  invite_status: string;
}
