import fs from 'fs';
import path from 'path';
import { Router, Request, Response, NextFunction } from 'express';
import { getResponseData } from './utils/util';
import Crowller from './utils/crowller';
import Analyzer from './utils/Analyzer';

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, '请先登录'));
  }
};

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
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
});

router.post('/login', (req: Request, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;
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
});
router.get('/logout', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (req.session) {
    req.session.login = undefined;
  }
  res.json(getResponseData(null));
});

router.get('/getData', checkLogin, (req: Request, res: Response) => {
  const secret = 'x3b174jsx';
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
  const analyzer = Analyzer.getInstance();
  new Crowller(url, analyzer);
  res.json(getResponseData(true));
});

router.get('/showData', checkLogin, (req: Request, res: Response) => {
  try {
    const position = path.resolve(__dirname, '../data/course.json');
    const result = fs.readFileSync(position, 'utf-8');
    res.json(getResponseData(JSON.parse(result)));
  } catch (e) {
    res.json(getResponseData(false, '尚未爬取到内容'));
  }
});
export default router;
