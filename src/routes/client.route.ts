import { Router, Express, Response } from "express"
import { clientController } from "../controller/client.controller"
import { isAuthenticated } from "../middleware/isAuthenticated"
import { Req } from "../types/request"
const router = Router()

router.use(isAuthenticated)

router.get("/client", async (req: Req, res: Response) => {
    await clientController.getClients(req, res)
})
router.post("/client", async (req: Req, res: Response) => {
    await clientController.saveClient(req, res)
})
router.put("/client", async (req: Req, res: Response) => {
    await clientController.updateClient(req, res)
})

export = { router }