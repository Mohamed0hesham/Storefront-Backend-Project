import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import usersRoutes from "./handlers/user";
import ordersRoutes from "./handlers/order";
import productsRoutes from "./handlers/product";

const app: express.Application = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", (req: express.Request, res: express.Response) => {
  res.send("Hello, world");
});

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
