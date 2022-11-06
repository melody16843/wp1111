import cors from 'cors';
import express from 'express';
import db from './db';
import routes from './routes';
import bodyParser from 'body-parser';
db.connect();

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use('/', routes);
app.use(bodyParser.json())

app.listen(port, () =>
console.log(`app listening on port ${port}!`),
)