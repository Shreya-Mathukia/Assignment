import express from "express";
import dotenv from "dotenv";
import {sequelize} from "./models";
import bycrptjs from 'bcryptjs';
import router from "./routes";
import Loginrouter from "./Login/Login";
import SignUprouter from "./Login/SignUp";
// import swaggerUi from "swagger-ui-express";
// const internalDoc = require('./swagger/swagger.json');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/', router);
app.use('/Login', Loginrouter);
app.use('/Login',SignUprouter)


// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(internalDoc));

app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
    sequelize.authenticate().then(async() => {
        console.log("database connected");

        try {
            await sequelize.sync()
        } catch (error) {
            console.log(error)
        }

    }).catch( (e: any) => {
        console.log(e.message)
    })
})

// export { app };