import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import connectMongoDB from './config/mongo.js';
import protect from './middleware/Auth.js';
import dashboardRouter from './Router/Dashboard/DashboardRouter.js';
import storeRouter from './Router/Store/StoreRouter.js';

dotenv.config();
connectMongoDB();
const app = express();
const PORT =  process.env.PORT || 2000;
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:4200','http://192.168.1.16:4200' , '*',process.env.HOST_FE],
    credentials: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', `*`);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    res.setHeader(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    // Pass to next layer of middleware
    next();
});

app.get("/", (req, res) => {
    res.send("api work");
})


app.use("/api/store",storeRouter)

app.use("/api/dashboard",dashboardRouter)

app.listen(PORT, console.log(`app running ${PORT}`));