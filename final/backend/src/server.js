import cors from 'cors';
import express from 'express';
import db from './db.js';
import routes from './routes/PageRouter.js';
import bodyParser from 'body-parser';
import path from 'path';

db.connect();

const app = express();
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}
app.use('/', routes);
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;



app.listen(port, () =>
  console.log(`app listening on port ${port}!`),
)
