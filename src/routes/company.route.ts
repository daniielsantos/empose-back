import { Router, Response } from "express"
import { companyController } from "../controller/company.controller"
import { Req } from "../types/request"
const router = Router()


router.get("/company", async (req: Req, res: Response) => {
    await companyController.getCompanies(req, res)
})

router.post("/company", async (req: Req, res: Response) => {
    await companyController.saveCompany(req, res)
})

router.put("/company", async (req: Req, res: Response) => {
    await companyController.updateCompany(req, res)
})

export = { router }