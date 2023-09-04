import "dotenv/config";
import Koa from 'koa';
import { onDatabaseConnect } from "./config/knex";
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import router from './routers/index'

const app = new Koa();

app.use(cors());
app.use(helmet());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const main = async () => {
    try {
        await onDatabaseConnect();
        console.log("Database Connected!!!");
        app.listen(Number(process.env.PORT), () =>{
            console.log(`Server started with port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
};

main();