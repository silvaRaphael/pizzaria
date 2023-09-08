import { Request } from 'express';

export const pageContext = (
  req: Request,
  value?: any,
): {
  url: string;
  query: any;
} => {
  return {
    url: req.url.split('?')[0],
    query: req.query,
    ...value,
  };
};
