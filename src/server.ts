require("dotenv").config()
import makeApp from "./app"
import { clientController } from "../src/controller/client.controller"
import { companyController } from "../src/controller/company.controller"
import { emailSenderController } from "../src/controller/email.controller"
import { paymentMethodController } from "../src/controller/payment.method.controller"
import { userController } from "../src/controller/user.controller"
import { categoryController } from "./controller/category.controller"
import { skuController } from "./controller/sku.controller"


const app = makeApp(userController, clientController, companyController, paymentMethodController, categoryController, skuController)

app.listen(3000, () => {
    console.log("Server running on port 3000")
})
