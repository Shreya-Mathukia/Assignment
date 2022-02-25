import express from "express";
import dotenv from "dotenv";
import {sequelize} from "./models";
import router from "./ContactUS/routes";
import Loginrouter from "./Login/LoginRoutes";
import SignUprouter from "./Login/SignUpRoutes";
import ForgotPasswordrouter from "./Forgot-Password/ForgotPassword.Router";
import SetupServiceRouter from "./BookService/SetupService/SetupService.routes";
import userAddressRouter from "./BookService/user-address/address.routes";
import scheduleRouter from "./BookService/create service/ScheduleService/schedule.routes";
import swaggerUi from "swagger-ui-express";
import internalDoc from "swagger-jsdoc";
import YourDetailRouter from "./BookService/create service/YourDetails/AddAdress.Routes";

dotenv.config();
const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Helperland APIs',
            version: '1.0.0',
            description: ' API for Helperland Project',
            contact: {
                name: 'Shreya Mathukia',
                url: 'http://web1.anasource.com/trainee2021/',
                email: 'helperland@tatvasoft.com'
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: [
        "public/ContactUs/routes.js",
        "public/Login/SignUpRoutes.js",
        "public/Login/LoginRoutes.js",
        "public/Forgot-Password/ForgotPassword.Router.js",
        "public/BookService/SetupService/SetupService.routes.js",
        "public/BookService/user-address/address.routes.js",
        "public/BookService/create service/ScheduleService/schedule.routes.js",
        "public/BookService/create service/YourDetails/AddAddress.Routes.js"

          ]
}


const swaggerDocs = internalDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/', router);
app.use('/Login', Loginrouter);
app.use('/Login',SignUprouter);
app.use('/', ForgotPasswordrouter);
app.use('/',SetupServiceRouter);
app.use('/',userAddressRouter);
app.use('/',scheduleRouter);
app.use('/',YourDetailRouter);



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

