enum Methods {
  get = 'get',
  post = 'post',
}

export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);

function getRequestDecorator(type: Methods) {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    };
  };
}
