import { Router, Response } from "express"
import { Req } from "../types/request"
const router = Router()

export default function(companyController: any) {

    router.get("/company", async (req: Req, res: Response) => {
        await companyController.getCompanies(req, res)
    })
    
    router.get("/company/:id", async (req: Req, res: Response) => {
        await companyController.getCompany(req, res)
    })
    
    router.post("/company", async (req: Req, res: Response) => {
        await companyController.saveCompany(req, res)
    })
    
    router.put("/company", async (req: Req, res: Response) => {
        await companyController.updateCompany(req, res)
    })
    
    router.delete("/company", async (req: Req, res: Response) => {
        await companyController.deleteCompany(req, res)
    })
    return router
}
