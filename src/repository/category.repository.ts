import { db } from "../services/db.service"
import format from "pg-format"
import { Category } from "../model/category.model"

function CategoryRepository(){
    this.db = db
}

CategoryRepository.prototype.getCategories = async function(companyId: number) {
    const query = `SELECT c.id, c.name, c.description, c.created_at, c.updated_at
    FROM category c
    WHERE c.company_id = $1
    `
    return this.db.query(query, [companyId])    
}

CategoryRepository.prototype.getCategory = async function(categoryId: number) {
    const query = `SELECT c.id, c.name, c.description, c.created_at, c.updated_at
    FROM category c
    WHERE c.id = $1
    `
    return this.db.query(query, [categoryId])    
}

CategoryRepository.prototype.saveCategory = async function(category: Category) {
    const payload = {
        name: category.name,
        description: category.description,
        company_id: category.company.id,
        created_at: category.created_at
    }
    const query = format(`INSERT INTO category("name", "description", "company_id", "created_at") VALUES (%L) RETURNING id`, Object.values(payload)) 
    return this.db.query(query)
}

CategoryRepository.prototype.updateCategory = async function(category: Category) {
    const payload = {
        id: category.id,
        name: category.name,
        description: category.description,
        updated_at: category.updated_at
    }    
    const query = `UPDATE category SET "name" = $2, "description" = $3, "updated_at" = $4 WHERE id = $1 RETURNING id`
    return this.db.query(query, Object.values(payload))
}

CategoryRepository.prototype.deleteCategory = async function(category: Category) {
    const query = `DELETE 
    FROM category c
    WHERE c.id = $1
    `
    return this.db.query(query, [category.id])    
}
const categoryRepository = new CategoryRepository
export { categoryRepository }
