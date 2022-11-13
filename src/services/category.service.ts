import { Category } from "../model/category.model"
import { Company } from "../model/company.model"
import { categoryRepository } from "../repository/category.repository"



function CategoryService() {
    this.categoryRepository = categoryRepository
}

CategoryService.prototype.getCategories = async function(company: Company) {
    try {
        const result = await this.categoryRepository.getCategories(company.id)
        return result.rows
    } catch(e) {
        throw new Error(e.message)
    }
}

CategoryService.prototype.getCategory = async function(categoryId: number, companyId: number) {
    try {
        const result = await this.categoryRepository.getCategory(categoryId, companyId)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

CategoryService.prototype.saveCategory = async function(category: Category) {
    try {
        category.created_at = new Date()
        const result = await this.categoryRepository.saveCategory(category)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

CategoryService.prototype.updateCategory = async function(category: Category) {
    try {
        let pay = await this.getCategory(category.id, category.company.id)
        if(!pay)
            throw new Error("categoria nao encontrado")
        category.updated_at = new Date
        const result = await this.categoryRepository.updateCategory(category)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

CategoryService.prototype.deleteCategory = async function(category: Category) {
    try {
        let pay = await this.getCategory(category.id, category.company.id)
        if(!pay)
            throw new Error("categoria nao encontrada")
        await this.categoryRepository.deleteCategory(category)
        return { message: "categoria deletada" }
    } catch(e) {
        throw new Error(e.message)
    }
}

const categoryService = new (CategoryService as any)
export { categoryService }
