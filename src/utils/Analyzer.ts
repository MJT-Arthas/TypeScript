import cheerio from 'cheerio';
import fs from 'fs';
import { AnalyzerType } from './crowller';

interface Course {
  title: string;
  count: number;
}
interface CourseResult {
  time: number;
  data: Course[];
}
interface Content {
  [propName: number]: Course[];
}

export default class DellAnalyzer implements AnalyzerType {
  //单例模式
  static instance: DellAnalyzer;
  private constructor() {}
  static getInstance = () =>
    DellAnalyzer.instance || (DellAnalyzer.instance = new DellAnalyzer());

  private getJsonInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');
    const courseInfos: Course[] = [];
    courseItems.map((index, element) => {
      const desc = $(element).find('.course-desc');
      const title = desc.eq(0).text();
      const count = parseInt(desc.eq(1).text().split('：')[1], 10);
      courseInfos.push({ title, count });
    });
    return {
      time: new Date().getTime(),
      data: courseInfos,
    };
  }
  private generateJsonContent(courseResult: CourseResult, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[courseResult.time] = courseResult.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const courseResult = this.getJsonInfo(html);
    const fileContent = this.generateJsonContent(courseResult, filePath);
    return JSON.stringify(fileContent);
  }
}
