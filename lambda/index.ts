import * as express from "express";

function apiRoutes() {
  const routes = express.Router();

  routes.get("/add", (req: any, res: any) => {
    let firstNum = req?.queryStringParameters?.firstNum ?? 0;
    let secondNum = req?.queryStringParameters?.secondNum ?? 0;

    let result = Number(firstNum) + Number(secondNum);
    console.log(
      `The Sum of "${firstNum}" and "${secondNum}" is equal to ${result}`
    );

    res.status(200).json({ result });
  });

  routes.get("/subtract", (req: any, res: any) => {
    let firstNum = req?.queryStringParameters?.firstNum ?? 0;
    let secondNum = req?.queryStringParameters?.secondNum ?? 0;

    let result = Number(firstNum) - Number(secondNum);
    console.log(
      `The Subtraction of "${firstNum}" and "${secondNum}" is equal to ${result}`
    );

    res.status(200).json({ result });
  });

  routes.get("/multiply", (req: any, res: any) => {
    let firstNum = req?.queryStringParameters?.firstNum ?? 0;
    let secondNum = req?.queryStringParameters?.secondNum ?? 0;

    let result = Number(firstNum) * Number(secondNum);
    console.log(
      `The Multiplication of "${firstNum}" and "${secondNum}" is equal to ${result}`
    );

    res.status(200).json({ result });
  });

  return routes;
}

const app = express().use(express.json()).use(apiRoutes());

const isInLambda = !!process.env.LAMBDA_TASK_ROOT;

if (isInLambda) {
  const serverlessExpress = require("@vendia/serverless-express");
  const server = serverlessExpress.createServer(app);

  exports.main = (event: any, context: any) => {
    serverlessExpress.proxy(server, event, context);
  };
} else {
  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
}
