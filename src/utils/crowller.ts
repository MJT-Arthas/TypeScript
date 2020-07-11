//ts->.d.ts翻译文件->js
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';

import Analyzer from './Analyzer';

export interface AnalyzerType {
  analyze: (html: string, filePath: string) => string;
}

class Crowller {
  private filePath = path.resolve(__dirname, '../../data/course.json');

  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }
  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }

  constructor(private url: string, analyzer: AnalyzerType) {
    this.initSpiderProcess();
  }
}

const secret = 'x3b174jsx';
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

const analyzer = Analyzer.getInstance();
// new Crowller(url, analyzer);

export default Crowller;
