import express, { json } from 'express';
import { routes } from "./routes"
const app = express();
app.use(routes);
app.use(json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is Running");
});