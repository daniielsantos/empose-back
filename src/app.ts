require("dotenv").config()
import "./model/tables.model"
import { Request, Response } from "express"
import { clientController } from "./controller/client.controller"
import { companyController } from "./controller/company.controller"
import { emailSenderController } from "./controller/email.controller"
import { userController } from "./controller/user.controller"
import { isAuthenticated } from "./middleware/isAuthenticated"
import { clientService } from "./services/client.service"
import { Req } from "./types/request"
import clientRoute from "./routes/client.route"
import emailSenderRoute from "./routes/email.sender.route"
import companyRoute from "./routes/company.route"
import usersRoute from "./routes/users.route"
import paymentMethodRoute from "./routes/payment.method.route"
const cors = require("cors")
const express = require("express")

const app = express()
app.use(express.json())
app.use(cors())
// app.use(isAuthenticated)
app.use("/api/v1/", companyRoute.router)
app.use("/api/v1/", clientRoute.router)
app.use("/api/v1/", emailSenderRoute.router)
app.use("/api/v1/", usersRoute.router)
app.use("/api/v1/", paymentMethodRoute.router)


// fazer uploade de arquivos no front e back



app.post("/api/v1/auth/login", async (req: Request, res: Response) => {
    await userController.userLogin(req, res)
})





app.listen(3000, () => {
    console.log("Server running on port 3000")
})
