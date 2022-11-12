import { Router, Express, Response } from "express"
import { isAuthenticated } from "../middleware/isAuthenticated"
import { Req } from "../types/request"
const router = Router()

export default function(clientController: any) {
    // console.log("entrou client ", clientController)
    router.use(isAuthenticated)
    router.get("/client", async (req: Req, res: Response) => {
        await clientController.getClients(req, res)
    })
    router.post("/client", async (req: Req, res: Response) => {
        // console.log("entrou save client")
        await clientController.saveClient(req, res)
    })
    router.put("/client", async (req: Req, res: Response) => {
        await clientController.updateClient(req, res)
    })
    return router
}

// export = { router }