declare namespace Express {
  interface Request {
    // [key: string]: string;
    teacherName: string;
  }
  interface Response {
    body: {
      [key: string]: string | undefined;
    };
  }
}
