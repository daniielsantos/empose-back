import { Category } from "../model/category.model"
import { Client } from "../model/client.model"
import { Store } from "../model/store.model"
import { categoryService } from "../services/category.service"

function CategoryController() {
    this.categoryService = categoryService
}
CategoryController.prototype.getStore = function(user: any): Store {
    const store: Store = {
        id: user.store_id
    }
    return store
}

CategoryController.prototype.getCategories = async function(user: any): Promise<Category[]>{
    const store = this.getStore(user)
    return this.categoryService.getCategories(store)
}

CategoryController.prototype.getCategory = async function(categoryId: number, user: any): Promise<Client> {
    const store = this.getStore(user)
    return this.categoryService.getCategory(categoryId, store.id)
}

CategoryController.prototype.saveCategory = async function(category: Category, user: any): Promise<Category> {
    const store: Store = this.getStore(user)
    category.store = store
    return this.categoryService.saveCategory(category)
}

CategoryController.prototype.updateCategory = async function(category: Category, user: any): Promise<Category> {
    const store = this.getStore(user)
    category.store = store
    return this.categoryService.updateCategory(category)
}

CategoryController.prototype.deleteCategory = async function(category: Category, user: any): Promise<Category> {
    const store = this.getStore(user)
    category.store = store
    return this.categoryService.deleteCategory(category)
}

const categoryController = new (CategoryController as any)
export { categoryController } 
