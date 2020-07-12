import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controller/loginController';
import './controller/crowllerController';
import router from './router';
const app = express();
app.use(bodyParser.urlencoded({ extended: true })); //使用中间件
//解析表单数据
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: 'session',
    keys: ['teacher dell'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(router);
app.listen(3030, () => {
  console.log('serve is running');
});
