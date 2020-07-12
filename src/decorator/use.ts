import 'reflect-metadata';
import { RequestHandler } from 'express';
import { crowllerController, LoginController } from '../controller';

export function use(middleware: RequestHandler) {
  return function (target: crowllerController | LoginController, key: string) {
    const originMiddlewares =
      Reflect.getMetadata('middlewares', target, key) || [];
    originMiddlewares.push(middleware);
    Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
  };
}
