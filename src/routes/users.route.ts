import { Router, Response } from "express"
import { Req } from "../types/request"

export default function(userController: any) {
    const router = Router()
    router.get("/users/:id", async (req: Req, res: Response) => {
        await userController.getUser(req, res)
    })
    
    router.get("/users", async (req: Req, res: Response) => {
        await userController.getUsers(req, res)
    })
    
    router.post("/users", async (req: Req, res: Response) => {
        console.log("########## Entrou controller")
        userController.saveUser()
        res.send({ok: "aa"})
        // await userController.saveUser(req, res)
    })
    
    router.put("/users", async (req: Req, res: Response) => {
        await userController.updateUser(req, res)
    })
    
    router.delete("/users", async (req: Req, res: Response) => {
        await userController.deleteUser(req, res)
    })
    return router
}

// export = { router }