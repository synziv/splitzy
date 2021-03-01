import  express from "express";
import createError from 'http-errors';
import path from "path";
import indexRouter from './routes/index';
import  cookieParser from "cookie-parser";
import  logger from "morgan";
import  cors from "cors";


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', indexRouter);

// catch 404 and forward to error handler
/*app.use((req, res, next)=> {
  next(createError(404));
});*/

// error handler
app.use((err:any, req: express.Request, res: express.Response, next:any)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

export default app
