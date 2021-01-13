import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "dynamo-layer-lambda",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: {
        forceExclude: ["hello_js_layer", "hello_ts_layer"],
      },
    },
  },
  // Add the serverless-webpack plugin
  plugins: ["serverless-webpack", "serverless-webpack-layers"],
  provider: {
    name: "aws",
    region: "eu-west-1",
    runtime: "nodejs12.x",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      NODE_PATH: "./:/opt/node_modules",
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
  },
  functions: {
    helloJs: {
      handler: "handlerJs.hello",
      events: [
        {
          http: {
            method: "get",
            path: "helloJs",
          },
        },
      ],
      layers: ["arn:aws:lambda:eu-west-1:187917125870:layer:HelloJsLayer:1"],
    },
    helloTs: {
      handler: "handlerTs.hello",
      events: [
        {
          http: {
            method: "get",
            path: "helloTs",
          },
        },
      ],
      layers: ["arn:aws:lambda:eu-west-1:187917125870:layer:HelloTsLayer:4"],
    },
  },
};

module.exports = serverlessConfiguration;
