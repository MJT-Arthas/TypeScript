import { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { get, controller, use } from '../decorator/index';
import { getResponseData } from '../utils/util';
import Crowller from '../utils/crowller';
import Analyzer from '../utils/Analyzer';
import fs from 'fs';
import path from 'path';

const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  const isLogin = !!(req.session ? req.session.login : false);
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, '请先登录'));
  }
};

@controller('/')
export class crowllerController {
  @get('/getData')
  @use(checkLogin)
  getData(req: Request, res: Response): void {
    const secret = 'x3b174jsx';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = Analyzer.getInstance();
    new Crowller(url, analyzer);
    res.json(getResponseData(true));
  }

  @get('/showData')
  @use(checkLogin)
  showData(req: Request, res: Response): void {
    try {
      const position = path.resolve(__dirname, '../../data/course.json');
      const result = fs.readFileSync(position, 'utf-8');
      res.json(getResponseData(JSON.parse(result)));
    } catch (e) {
      res.json(getResponseData(false, '尚未爬取到内容'));
    }
  }
}
