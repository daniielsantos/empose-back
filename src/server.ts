require("dotenv").config()
import makeApp from "./app"
import { clientController } from "./controller/client.controller"
import { companyController } from "./controller/company.controller"
import { paymentMethodController } from "./controller/payment.method.controller"
import { userController } from "./controller/user.controller"
import { categoryController } from "./controller/category.controller"
import { skuController } from "./controller/sku.controller"
import { skuInventoryController } from "./controller/sku.inventory.controller"
import { productController } from "./controller/product.controller"
import { orderController } from "./controller/order.controller"
import { emailSenderController } from "./controller/email.controller"
import { uploadsController } from "./controller/uploads.controller"


const app = makeApp(
    userController, 
    clientController, 
    companyController, 
    paymentMethodController, 
    categoryController, 
    skuController, 
    skuInventoryController,
    productController,
    orderController,
    emailSenderController,
    uploadsController
    )

app.listen(3000, () => {
    console.log("Server running on port 3000")
})
