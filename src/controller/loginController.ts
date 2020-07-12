import { Router, Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { controller, get, post } from '../decorator/index';
import { getResponseData } from '../utils/util';

@controller('/')
export class LoginController {
  static isLogin(req: Request) {
    return !!(req.session ? req.session.login : false);
  }
  @post('/login')
  login(req: Request, res: Response): void {
    const { password } = req.body;
    const isLogin = LoginController.isLogin(req);
    if (isLogin) {
      // res.redirect('/');
      res.json(getResponseData(false, '已经登陆过'));
    } else {
      if (password === '123' && req.session) {
        req.session.login = true;
        // res.redirect('/');
        res.json(getResponseData(true));
      } else {
        res.json(getResponseData(false, '登陆失败'));
      }
    }
  }

  @get('/logout')
  logout(req: Request, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData(null));
  }

  @get('/')
  home(req: Request, res: Response) {
    const isLogin = LoginController.isLogin(req);
    if (isLogin) {
      res.send(`
    <html>
      <body>
      <a href='/showData'>展示内容</a>
        <a href='/getData'>爬取内容</a>
        <a href='/logout'>退出</a>
      </body>
    </html>
  `);
    } else {
      res.send(`
    <html>
      <body>
        <form method="post" action='/login'>
          <input type = 'password' name='password'/>
          <button>提交</button>
        <form/>
      </body>
    </html>
  `);
    }
  }
}
