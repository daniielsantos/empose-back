import { Category } from "../model/category.model"
import { Client } from "../model/client.model"
import { Company } from "../model/company.model"
import { categoryService } from "../services/category.service"

function CategoryController(this: any) {
    this.categoryService = categoryService
}
CategoryController.prototype.getCompany = function(user: any) {
    const company: Company = {
        id: user.company_id
    }
    return company
}

CategoryController.prototype.getCategories = async function(user: any): Promise<Category[]>{
    const company = this.getCompany(user)
    return this.categoryService.getCategories(company)
}

CategoryController.prototype.getCategory = async function(categoryId: number): Promise<Client> {
    return this.categoryService.getCategory(categoryId)
}

CategoryController.prototype.saveCategory = async function(category: Category, user: any): Promise<Category> {
    const company: Company = this.getCompany(user)
    category.company = company
    return this.categoryService.saveCategory(category)
}

CategoryController.prototype.updateCategory = async function(category: Category): Promise<Category> {
    return this.categoryService.updateCategory(category)
}

CategoryController.prototype.deleteCategory = async function(category: Category): Promise<Category> {
    return this.categoryService.deleteCategory(category)
}

const categoryController = new (CategoryController as any)
export { categoryController } 
