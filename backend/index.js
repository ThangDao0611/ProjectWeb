import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './src/routers/Data';
import routerUser from './src/routers/User';
import routerCon from './src/routers/Contribution';
import routerNew from './src/routers/NewWord';
require("dotenv").config();
require("./src/config/database");

let app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(routerUser);
app.use(routerCon);
app.use(routerNew);
//router
app.get('/', (req, res) => {
    res.status(200).send({ message: "Hello"});
})

app.listen(port,()=>{
    console.log(`Server start with port: ${port}`);
});
