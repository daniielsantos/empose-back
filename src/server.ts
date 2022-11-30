require("dotenv").config()
import makeApp from "./app"
import { clientController } from "./controller/client.controller"
import { storeController } from "./controller/store.controller"
import { paymentMethodController } from "./controller/payment.method.controller"
import { userController } from "./controller/user.controller"
import { categoryController } from "./controller/category.controller"
import { skuController } from "./controller/sku.controller"
import { skuInventoryController } from "./controller/sku.inventory.controller"
import { productController } from "./controller/product.controller"
import { orderController } from "./controller/order.controller"
import { emailSenderController } from "./controller/email.controller"
import { uploadsController } from "./controller/uploads.controller"
import { uploadFileController } from "./controller/upload.file.controller"
import { configController } from "./controller/configs.controller"


const app = makeApp(
    userController, 
    clientController, 
    storeController, 
    paymentMethodController, 
    categoryController, 
    skuController, 
    skuInventoryController,
    productController,
    orderController,
    emailSenderController,
    uploadsController,
    uploadFileController,
    configController
    )

app.listen(3000, () => {
    console.log("Server running on port 3000")
})
