// idea from https://www.codemzy.com/blog/nodejs-file-folder-structure
import { Router } from 'express';
import { router as groupsRouter } from './groups/groups.routes.js'

export const apiRouter = Router();

apiRouter.use('/groups', groupsRouter);

apiRouter.use((req, res, _next) => {
  res.status(404).json({ error: 'Not Found', message: `${req.url} not found.` });
});

