import { Store } from "../model/store.model"
import { Product } from "../model/product.model"
import { productService } from "../services/product.service"

function ProductController() {
    this.productService = productService
}
ProductController.prototype.getStore = function(user: any) {
    const store: Store = {
        id: user.store_id
    }
    return store
}

ProductController.prototype.getProducts = async function(user: any): Promise<Product[]>{
    const store = this.getStore(user)
    return this.productService.getProducts(store)
}

ProductController.prototype.getProduct = async function(productId: number, user: any): Promise<Product> {
    const store = this.getStore(user)
    return this.productService.getProduct(productId, store.id)
}

ProductController.prototype.saveProduct = async function(product: Product, user: any): Promise<Product> {
    const store: Store = this.getStore(user)
    product.store = store
    return this.productService.saveProduct(product)
}

ProductController.prototype.updateProduct = async function(product: Product, user: any): Promise<Product> {
    const store = this.getStore(user)
    product.store = store    
    return this.productService.updateProduct(product)
}

ProductController.prototype.deleteProduct = async function(product: Product, user: any): Promise<Product> {
    const store = this.getStore(user)
    product.store = store
    return this.productService.deleteProduct(product)
}

const productController = new (ProductController as any)
export { productController } 

