require("dotenv").config()
import "./model/tables.model"
import { Response } from "express"
import { Req } from "./types/request"
import { isAuthenticated } from "./middleware/isAuthenticated"
const cors = require("cors")
const express = require("express")

function makeApp(
    userController = null, 
    clientController = null, 
    companyController = null, 
    paymentMethodController = null, 
    categoryController = null, 
    skuController = null, 
    skuInventoryController = null, 
    productController = null, 
    orderController = null, 
    emailSenderController = null,
    uploadsController = null,
    uploadFileController = null
    ) {

    const app = express()
    app.use(express.json())
    app.use(cors())
    app.use('/uploads', express.static(__dirname + '/uploads'))

    app.get("/api/v1/users", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await userController.getUsers(req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.get("/api/v1/users/:id", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await userController.getUser(req.params.id, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.post("/api/v1/users", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await userController.saveUser(req.body)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.put("/api/v1/users", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await userController.updateUser(req.body, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.delete("/api/v1/users", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await userController.deleteUser(req.body, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })
// -----------------------------

    app.post("/api/v1/users-login", async (req: Request, res: Response) => {
        try {
            const result = await userController.userLogin(req.body)
            res.send(result)            
        } catch (e) {
            res.status(400).send({message: e.message})
        }
    })

// -----------------------------

    app.get("/api/v1/client/:id", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await clientController.getClient(req.params.id, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.get("/api/v1/client", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await clientController.getClients(req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.post("/api/v1/client", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await clientController.saveClient(req.body, req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.put("/api/v1/client", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await clientController.updateClient(req.body, req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.delete("/api/v1/client", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await clientController.deleteClient(req.body, req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })
// -----------------------------

    app.get("/api/v1/company/:id", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await companyController.getCompany(req.params.id)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.get("/api/v1/company", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await companyController.getCompanies()
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.post("/api/v1/company", async (req: Req, res: Response) => {
        try {
            const result = await companyController.saveCompany(req.body)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.put("/api/v1/company", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await companyController.updateCompany(req.body)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.delete("/api/v1/company", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await companyController.deleteCompany(req.body)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })
// -----------------------------
    app.get("/api/v1/payment-methods/:id", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await paymentMethodController.getPaymentMethod(req.params.id, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.get("/api/v1/payment-methods", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await paymentMethodController.getPaymentMethods(req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.post("/api/v1/payment-methods", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await paymentMethodController.savePaymentMethod(req.body, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.put("/api/v1/payment-methods", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await paymentMethodController.updatePaymentMethod(req.body, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.delete("/api/v1/payment-methods", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await paymentMethodController.deletePaymentMethod(req.body, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

// -----------------------------

    app.get("/api/v1/category/:id", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await categoryController.getCategory(req.params.id, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.get("/api/v1/category", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await categoryController.getCategories(req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.post("/api/v1/category", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await categoryController.saveCategory(req.body, req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.put("/api/v1/category", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await categoryController.updateCategory(req.body, req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.delete("/api/v1/category", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await categoryController.deleteCategory(req.body, req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })
// -----------------------------

    app.get("/api/v1/sku/:id", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await skuController.getSku(req.params.id, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.get("/api/v1/sku", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await skuController.getSkus(req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.post("/api/v1/sku", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await skuController.saveSku(req.body, req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.put("/api/v1/sku", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await skuController.updateSku(req.body, req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.delete("/api/v1/sku", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await skuController.deleteSku(req.body, req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })
// -----------------------------

    app.get("/api/v1/sku-inventory", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await skuInventoryController.getSkusInventory(req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.get("/api/v1/sku-inventory/:id", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await skuInventoryController.getSkuInventory(req.params.id, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.put("/api/v1/sku-inventory", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await skuInventoryController.updateSkuInventory(req.body, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

// -----------------------------

    app.get("/api/v1/product/:id", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await productController.getProduct(req.params.id, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.get("/api/v1/product", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await productController.getProducts(req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.post("/api/v1/product", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await productController.saveProduct(req.body, req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.put("/api/v1/product", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await productController.updateProduct(req.body, req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.delete("/api/v1/product", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await productController.deleteProduct(req.body, req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })
// -----------------------------

    app.get("/api/v1/order/:id", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await orderController.getOrder(req.params.id, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.get("/api/v1/order", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await orderController.getOrders(req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.post("/api/v1/order", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await orderController.saveOrder(req.body, req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.put("/api/v1/order", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await orderController.updateOrder(req.body, req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.delete("/api/v1/order", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await orderController.deleteOrder(req.body, req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })
// -----------------------------
    app.get("/api/v1/uploads/:id", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await uploadsController.getUpload(req.params.id, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.get("/api/v1/uploads", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await uploadsController.getUploads(req.user)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })

    app.post("/api/v1/uploads", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await uploadsController.saveUpload(req.body, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.put("/api/v1/uploads", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await uploadsController.updateUpload(req.body, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })

    app.delete("/api/v1/uploads", isAuthenticated, async (req: Req, res: Response) => {
        try {
            const result = await uploadsController.deleteUpload(req.body, req.user)
            res.send(result)            
        } catch (e) {
            res.status(400).send({ message: e.message })            
        }
    })


// -----------------------------

    app.post("/api/v1/email-sender", isAuthenticated, async (req: Req, res: Response) => {
        try {
            let result = await emailSenderController.send(req.body)
            res.send(result)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })
// -----------------------------
    app.post("/api/v1/fileUpload", isAuthenticated, async (req: Req, res: Response) => {
        try {
            await uploadFileController.uploadFile(req, res)
        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    })
    return app
}

export = makeApp
