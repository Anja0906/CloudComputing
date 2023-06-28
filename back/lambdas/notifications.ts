import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyWebsocketEventV2, APIGatewayProxyResult } from 'aws-lambda';

const dynamoDB = new DynamoDB.DocumentClient();

export const connect = async (event: APIGatewayProxyWebsocketEventV2): Promise<APIGatewayProxyResult> => {
  console.log("Event " + JSON.stringify(event));
  return { statusCode: 200, body: 'Connected.' };
};

export const defaultHandler = async (event: APIGatewayProxyWebsocketEventV2): Promise<APIGatewayProxyResult> => {
    console.log("Event " + JSON.stringify(event));
  
    if (!event.body) return { statusCode: 400, body: 'No body.' };
    const message = JSON.parse(event.body).message;
    
    await dynamoDB.put({
      TableName: "UserWebSockets",
      Item: {
          user_sub: message,
          socket_id: event.requestContext.connectionId,
          route_key: event.requestContext.routeKey,
          domain_name: event.requestContext.domainName,
          stage: event.requestContext.stage
      }
    }).promise();
    return { statusCode: 200, body: 'Connected.' };
  };
