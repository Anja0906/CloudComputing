import { Injectable } from "@angular/core";
import * as AWS from "aws-sdk";
import { enviroment } from "../../enviroments/enviroment";
import { CredentialsOptions } from "aws-sdk/lib/credentials";
import { Auth } from 'aws-amplify';
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

@Injectable({
    providedIn: 'root'
})
export class DynamoDbService {
    client: AWS.DynamoDB | undefined;

    constructor() {

    }

    async initClient() {
        const data = await Auth.currentSession()
        const credentials = await fromCognitoIdentityPool({
            clientConfig: { region: enviroment.sdk.region },
            identityPoolId: enviroment.sdk.pool,
            logins: {
                ['cognito-idp.' + enviroment.sdk.region + '.amazonaws.com/eu-central-1_phC5VkLWT']: data.getIdToken().getJwtToken()
            }
        })()

        AWS.config.update({
            credentials: credentials
        })
        this.client = new AWS.DynamoDB({
            region: enviroment.sdk.region,
            credentials: credentials,
        });
        return this.client
    }

    async putItem(params: AWS.DynamoDB.PutItemInput) {
        let client = this.client;
        if (!client) client = await this.initClient();

        client.putItem(params, (err: any, data: any) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Item inserted successfully:', data);
            }
        });
    }
}
