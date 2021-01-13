import { APIGatewayProxyHandler } from "aws-lambda";
import { helloTs } from "hello_ts_layer";

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: helloTs(),
        input: event,
      },
      null,
      2
    ),
  };
};
