import express from "express";
import dotenv from "dotenv";
import {sequelize} from "./models";
import router from "./ContactUS/routes";
import Loginrouter from "./Login/LoginRoutes";
import SignUprouter from "./Login/SignUpRoutes";
import ForgotPasswordrouter from "./Forgot-Password/ForgotPassword.Router";
import SetupServiceRouter from "./BookService/SetupService/SetupService.routes";
import userAddressRouter from "./BookService/user-address/address.routes";
import scheduleRouter from "./BookService/create service/schedule.routes";
import swaggerUi from "swagger-ui-express";
import internalDoc from "swagger-jsdoc";

dotenv.config();
const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SignUp LogIn API',
            version: '1.0.0',
            description: 'SignUp LogIn API for Helperland Project',
            contact: {
                name: 'Shreya Mathukia',
                url: 'http://web1.anasource.com/trainee2021/',
                email: 'helperland@tatvasoft.com'
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: [
            
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



 app.use('/swagger', swaggerUi.serve, swaggerUi.setup(internalDoc));

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

