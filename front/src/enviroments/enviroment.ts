export const enviroment = {
  cognito:{
    identityPoolId: 'eu-central-1:c0497f4b-a870-47bf-b022-9f79f365b7c5', //REQUIRED - Amazon Cognito Identity Pool ID
    region: 'eu-central-1',
    userPoolId: 'eu-central-1_Y7Wi1Ke6f',
    userPoolWebClientId: '3g8s1ghmdd1i1g22f21tu5dnot',
  },
  storage:{
    bucket: 'tim18-cloud-computing-user-upload',
    region: 'eu-central-1'
  },
  sdk:{
    region: 'eu-central-1',
    pool: 'eu-central-1:c0497f4b-a870-47bf-b022-9f79f365b7c5'
  }
}
