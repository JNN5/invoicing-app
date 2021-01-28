/*import { useState, useCallback } from "react";

import {
  DynamoDBClient,
  PutItemCommand,
  DeleteItemCommand,
  GetItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "eu-west-1",
  endpoint: "http://localhost:8000",
  credentials: {
    accessKeyId: "fakeMyKeyId",
    secretAccessKey: "fakeSecretAccessKey",
  },
});

export default function useDatabase() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const crudStateManagement = (call, params) => {
    try {
      setIsLoading(true);
      return call(params).then(() => setIsLoading(false) );
    } catch (e) {
      setError(e);
      setIsLoading(false);
      throw e;
    }
  };

  const create = async (params) => crudStateManagement(createFunction, params);
  const get = async (params) => crudStateManagement(getFunction, params);
  const list = async (params) => crudStateManagement(listFunction, params);
  const update = async (params) => crudStateManagement(updateFunction, params);
  const del = async (params) => crudStateManagement(delFunction, params);

  return {
    isLoading,
    error,
    functions: {
      list: useCallback(list, []),
      get: useCallback(get, []),
      create: useCallback(create, []),
      update: useCallback(update, []),
      del: useCallback(del, []),
    },
  };
}

async function createFunction(params) {
  let item = {};
  Object.entries(params.item).forEach(
    (key, value) => (item[key] = { S: value })
  );

  const callParams = {
    TableName: params.tableName,
    Item: item,
  };
  const command = new PutItemCommand(callParams);

  try {
    return await client.send(command);
  } catch (error) {
    console.log(error);
  }
}

async function getFunction(params, stateObj) {
  const callParams = {
    TableName: params.tableName,
    Key: {
      id: {
        S: params.key,
      },
    },
  };
  const command = new GetItemCommand(callParams);

  try {
    return await client.send(command);
  } catch (error) {
    console.log(error);
  }
}

async function listFunction(params, stateObj) {
  const callParams = {
    TableName: params.tableName,
  };
  const command = new ScanCommand(callParams);

  try {
    return await client.send(command);
  } catch (error) {
    console.log(error);
  }
}

async function updateFunction(params, stateObj) {
  let updateExpression = "SET ";
  let expressionAttributeValues = {};
  Object.entries(params.item).forEach((key, value) => {
    updateExpression = updateExpression + "#" + key + "= :" + value + ", ";
    expressionAttributeValues[":" + value] = { S: value };
  });

  const callParams = {
    TableName: params.tableName,
    Key: {
      id: {
        S: params.key,
      },
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
  };
  const command = new PutItemCommand(callParams);

  try {
    return await client.send(command);
  } catch (error) {
    console.log(error);
  }
}

async function delFunction(params, stateObj) {
  const callParams = {
    TableName: params.tableName,
    Key: {
      id: {
        S: params.key,
      },
    },
  };
  const command = new DeleteItemCommand(callParams);

  try {
    return await client.send(command);
  } catch (error) {
    console.log(error);
  }
}*/
