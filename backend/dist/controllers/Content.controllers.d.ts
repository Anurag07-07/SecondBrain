import express from 'express';
export declare const createContent: (req: express.Request, res: express.Response) => Promise<void>;
export declare const getContent: (req: express.Request, res: express.Response) => Promise<void>;
export declare const deleteContent: (req: express.Request, res: express.Response) => Promise<void>;
export declare const LinkGenerate: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const shareableLink: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=Content.controllers.d.ts.map