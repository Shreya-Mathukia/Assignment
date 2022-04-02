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
import ProfileRouter from "./ServiceProvider Pages/Profile/Routes";
import UpcomingServiceRouter from "./ServiceProvider Pages/UpcomingServiceRequest/Routes";
import HelperServiceHistoryRouter from "./ServiceProvider Pages/ServiceHistory/Routes";
import HelperMyRatingsRouter from "./ServiceProvider Pages/MyRatings/Routes";
import HelperBlockCustomerRouter from "./ServiceProvider Pages/BlockCustomer/Routes";
import HelperNewServiceRequestRouter from "./ServiceProvider Pages/NewServiceRequest/Routes";
import AdminUMRouter from "./Admin Pages/UserManagement/Routes";
import AdminSRRouter from "./Admin Pages/ServiceRequests/Routes";
import FavProrouter from "./Customer Pages/MyFavoritePros/Routes";
import Dashboardrouter from "./Customer Pages/Dashboard/Routes";
import settingsRouter from "./Customer Pages/My Settings/Routes";
import historyRouter from "./Customer Pages/ServiceHistory/Routes";
import swaggerJSDoc from "swagger-jsdoc";

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
        "ContactUs/routes.ts",
        "Login/SignUpRoutes.ts",
        "Login/LoginRoutes.ts",
        "Forgot-Password/ForgotPassword.Router.ts",
        "BookService/SetupService/SetupService.routes.ts",
        "BookService/create service/ScheduleService/schedule.routes.ts",
        "BookService/create service/YourDetails.AddAddress.Routes.ts",
        "BookService/user-address/address.routes.ts",
        "Admin Pages/ServiceRequests/Routes.ts",
        "Admin Pages/UserManagement/Routes.ts"

          ]
}


const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/', router);
app.use('/', Loginrouter);
app.use('/Login',SignUprouter);
app.use('/', ForgotPasswordrouter);
app.use('/',SetupServiceRouter);
app.use('/',userAddressRouter);
app.use('/',scheduleRouter);
app.use('/',YourDetailRouter);
app.use('/',scheduleRouter);
app.use('/',YourDetailRouter);
app.use('/',SetupServiceRouter);
app.use('/',userAddressRouter);
app.use('/',Dashboardrouter);
app.use('/',settingsRouter);
app.use('/',historyRouter);
app.use('/',ProfileRouter);
app.use('/',UpcomingServiceRouter);
app.use('/',HelperServiceHistoryRouter);
app.use('/',HelperMyRatingsRouter);
app.use('/',HelperBlockCustomerRouter);
app.use('/',HelperNewServiceRequestRouter);
app.use('/',AdminUMRouter);
app.use('/',AdminSRRouter);
app.use('/',FavProrouter);

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

