import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@nicolas.thompson/common';

import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes';
import { deleteOrderRouter } from './routes/delete';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({ signed: false, secure: false }));

app.use(currentUser);

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
