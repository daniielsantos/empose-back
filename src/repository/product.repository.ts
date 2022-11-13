import { db } from "../services/db.service"
import format from "pg-format"
import { Product } from "../model/product.model"

function ProductRepository(){
    this.db = db
}

ProductRepository.prototype.getProducts = async function(companyId: number) {
    const query = `SELECT p.id, p.name, p.description, p.active, p.discount, p.created_at, p.updated_at, 
    json_strip_nulls(json_agg(json_build_object('id', s.id, 'name', s.name, 'description', s.description, 'active', s.active, 'price', s.price, 'created_at', s.created_at, 'updated_at', s.updated_at))) AS skus
    FROM Product p
    LEFT JOIN sku s ON s.product_id = p.id
    WHERE p.company_id = $1
    GROUP BY 
    p.id,
    p.name,
    p.description,
    p.active,
    p.discount,
    p.created_at,
    p.updated_at
    `
    return this.db.query(query, [companyId])    
}

ProductRepository.prototype.getProduct = async function(productId: number, companyId: number) {
    const query = `SELECT p.id, p.name, p.description, p.active, p.discount, p.created_at, p.updated_at, 
    json_strip_nulls(json_agg(json_build_object('id', s.id, 'name', s.name, 'description', s.description, 'active', s.active, 'price', s.price, 'created_at', s.created_at, 'updated_at', s.updated_at))) AS skus
    FROM Product p
    LEFT JOIN sku s ON s.product_id = p.id
    WHERE p.id = $1
    AND p.company_id = $2
    GROUP BY 
    p.id,
    p.name,
    p.description,
    p.active,
    p.discount,
    p.created_at,
    p.updated_at
    `
    return this.db.query(query, [productId, companyId])    
}

ProductRepository.prototype.saveProduct = async function(product: Product) {
    const payload = {
        name: product.name,
        description: product.description,
        active: product.active,
        discount: product.discount,
        category_id: product.category.id,
        company_id: product.company.id,
        created_at: product.created_at,
    }
    const query = format(`INSERT INTO Product("name", "description", "active", "discount", "category_id", "company_id", "created_at") VALUES (%L) RETURNING *`, Object.values(payload)) 
    const prod = await this.db.query(query)
    return prod.rows[0]
}

ProductRepository.prototype.updateProduct = async function(product: Product) {
    const payload = {
        id: product.id,
        name: product.name,
        description: product.description,
        active: product.active,
        discount: product.discount,
        category_id: product.category.id,
        company_id: product.company.id,
        updated_at: product.updated_at,
    }
    const query = `UPDATE Product SET "name" = $2, "description" = $3, "active" = $4, "discount" = $5, "category_id" = $6, "company_id" = $7, "updated_at" = $8 WHERE id = $1 RETURNING *`
    let result = await this.db.query(query, Object.values(payload))
    return result.rows[0]
}

ProductRepository.prototype.deleteProduct = async function(product: Product) {
    const query = `DELETE 
    FROM product p
    WHERE p.id = $1
    `
    return this.db.query(query, [product.id])    
}
const productRepository = new ProductRepository
export { productRepository }
