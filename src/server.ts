import express, { NextFunction, Request, Response } from 'express';
const { GraphQLServer } = require("graphql-yoga");
import cors from "cors";
import { StatusCodes } from 'http-status-codes';
import { logger } from './services';
import morgan from 'morgan';

import router from './routes';
import { typeDefs, resolvers } from './graphql/schema'

const server = new GraphQLServer({ typeDefs, resolvers })

server.express.use(
  morgan('tiny', {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  } as morgan.Options<Request,Response>),
);

server.express.use(cors());

server.express.use(express.json());
server.express.use(express.urlencoded({extended: true}));



server.express.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
})

server.express.use(router);

// error handler
server.express.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.log({
    level: 'debug',
    message: err.message
  });
    return res.status(StatusCodes.BAD_REQUEST).json({
        error: err.message,
    });
});

const options = {
  port: process.env.PORT || '3100',
  endpoint: '/graphql',
  playground: '/playground',
}
server.start(options, () => {
  logger.log({
    level: 'debug',
    message: 'Server Started at Port: 3100'
  });
})

export default server;