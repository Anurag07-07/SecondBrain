import express, { type NextFunction } from 'express';
declare const authMiddleware: (req: express.Request, res: express.Response, next: NextFunction) => Promise<express.Response<any, Record<string, any>> | undefined>;
export default authMiddleware;
//# sourceMappingURL=auth.middleware.d.ts.map