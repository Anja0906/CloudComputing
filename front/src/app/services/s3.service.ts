import { Injectable } from "@angular/core";
import { Storage } from "@aws-amplify/storage";

@Injectable({
    providedIn: 'root'
})
export class S3Service {
    constructor() {
    }

    async uploadFile(file: File, key: string): Promise<String> {
        const result = await Storage.put(key, file, {
            level: "private",
            contentType: file.type,
        });
        console.log(result);
        return result.key
    }
}
