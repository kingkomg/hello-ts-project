import { APIGatewayProxyHandler } from "aws-lambda";
import { helloJs } from "hello_js_layer";

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: helloJs(),
        input: event,
      },
      null,
      2
    ),
  };
};
