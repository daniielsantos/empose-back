require("dotenv").config()
import "./model/tables.model"
import { Request, Response } from "express"
import { clientController } from "./controller/client.controller"
import { companyController } from "./controller/company.controller"
import { emailSenderController } from "./controller/email.controller"
import { userController } from "./controller/user.controller"
import { isAuthenticated } from "./middleware/isAuthenticated"
import { clientService } from "./services/client.service"
const cors = require("cors")
const express = require("express")

const app = express()
app.use(express.json())
app.use(cors())
// app.use(isAuthenticated)

app.post("/api/v1/email-sender", async (req: Request, res: Response) => {
    await emailSenderController.send(req, res)
})

app.get("/api/v1/client", async (req: Request, res: Response) => {
    await clientController.getClients(req, res)
})
app.post("/api/v1/client", async (req: Request, res: Response) => {
    await clientController.saveClient(req, res)
})
app.put("/api/v1/client", async (req: Request, res: Response) => {
    await clientController.updateClient(req, res)
})



app.get("/api/v1/company", async (req: Request, res: Response) => {
    await companyController.getCompanies(req, res)
})

app.post("/api/v1/company", async (req: Request, res: Response) => {
    await companyController.saveCompany(req, res)
})

app.put("/api/v1/company", async (req: Request, res: Response) => {
    await companyController.updateCompany(req, res)
})

app.get("/api/v1/users", async (req: Request, res: Response) => {
    await clientController.getUser(req, res)
})
app.post("/api/v1/users", async (req: Request, res: Response) => {
    await userController.saveUser(req, res)
})

app.post("/api/v1/auth/login", async (req: Request, res: Response) => {
    await userController.userLogin(req, res)
})





app.listen(3000, () => {
    console.log("Server running on port 3000")
})
