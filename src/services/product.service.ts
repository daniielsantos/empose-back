import { Request, Response } from "express"
import { Client } from "../model/client.model"
import { Company } from "../model/company.model"
import { Product } from "../model/product.model"
import { productRepository } from "../repository/product.repository"
import { categoryService } from "./category.service"



function ProductService(this: any) {
    this.productRepository = productRepository
    this.categoryService = categoryService
}

ProductService.prototype.getProducts = async function(company: Company) {
    try {
        const result = await this.productRepository.getProducts(company.id)
        return result.rows
    } catch(e) {
        throw new Error(e.message)
    }
}

ProductService.prototype.getProduct = async function(productId: number, companyId: number) {
    try {
        const result = await this.productRepository.getProduct(productId, companyId)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

ProductService.prototype.saveProduct = async function(product: Product) {
    try {
        product.created_at = new Date
        let cat = await this.categoryService.getCategory(product.category.id, product.company.id)
        if(!cat)
            throw new Error("categoria do produto nao encontrada")

        let result = await this.productRepository.saveProduct(product)
        return result
    } catch(e) {
        throw new Error(e.message)
    }
}

ProductService.prototype.updateProduct = async function(product: Product) {
    try {
        let pay = await this.getProduct(product.id)
        if(!pay)
            throw new Error("produto nao encontrado")
        product.updated_at = new Date
        const result = await this.productRepository.updateProduct(product)
        return result
    } catch(e) {
        throw new Error(e.message)
    }
}

ProductService.prototype.deleteProduct = async function(client: Client) {
    try {
        let pay = await this.getProduct(client.id)
        if(!pay)
            throw new Error("produto nao encontrado")
        await this.productRepository.deleteProduct(client)
        return { message: "produto deletado" }
    } catch(e) {
        throw new Error(e.message)
    }
}

const productService = new (ProductService as any)
export { productService }

// exports = ClientService