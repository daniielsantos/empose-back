import { Company } from "../model/company.model"
import { Product } from "../model/product.model"
import { productService } from "../services/product.service"

function ProductController() {
    this.productService = productService
}
ProductController.prototype.getCompany = function(user: any) {
    const company: Company = {
        id: user.company_id
    }
    return company
}

ProductController.prototype.getProducts = async function(user: any): Promise<Product[]>{
    const company = this.getCompany(user)
    return this.productService.getProducts(company)
}

ProductController.prototype.getProduct = async function(productId: number, user: any): Promise<Product> {
    const company = this.getCompany(user)
    return this.productService.getProduct(productId, company.id)
}

ProductController.prototype.saveProduct = async function(product: Product, user: any): Promise<Product> {
    const company: Company = this.getCompany(user)
    product.company = company
    return this.productService.saveProduct(product)
}

ProductController.prototype.updateProduct = async function(product: Product, user: any): Promise<Product> {
    const company = this.getCompany(user)
    product.company = company    
    return this.productService.updateProduct(product)
}

ProductController.prototype.deleteProduct = async function(product: Product, user: any): Promise<Product> {
    const company = this.getCompany(user)
    product.company = company
    return this.productService.deleteProduct(product)
}

const productController = new (ProductController as any)
export { productController } 

