import express from 'express';
import cors from 'cors';
import router from './routes';
import notFoundRoute from './middlewares/notFoundRoute';
import globalErrorHandler from './middlewares/globalErrorHandler';

export const app = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Sportify Server is running');
});

// not found route
app.use(notFoundRoute);

// error handling for whole project
app.use(globalErrorHandler);
