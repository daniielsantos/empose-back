import { Router, Response } from "express"
import { isAuthenticated } from "../middleware/isAuthenticated"
import { Req } from "../types/request"

const router = Router()

export default function(paymentMethodController: any) {

    router.use(isAuthenticated)
    
    router.get("/payment-methods", async (req: Req, res: Response) => {
        await paymentMethodController.getPaymentMethods(req, res)
    })
    router.get("/payment-methods/:id", async (req: Req, res: Response) => {
        await paymentMethodController.getPaymentMethod(req, res)
    })
    router.post("/payment-methods", async (req: Req, res: Response) => {
        await paymentMethodController.savePaymentMethod(req, res)
    })
    router.put("/payment-methods", async (req: Req, res: Response) => {
        await paymentMethodController.updatePaymentMethod(req, res)
    })
    router.delete("/payment-methods", async (req: Req, res: Response) => {
        await paymentMethodController.deletePaymentMethod(req, res)
    })
    return router
}
