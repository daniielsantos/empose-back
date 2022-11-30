import { Store } from "../model/store.model"
import { Users } from "../model/user.model"
import { userService } from "../services/user.service"

function UserController() {
    this.userService = userService
}

UserController.prototype.getStore = function(user: any) {
    const store: Store = {
        id: user.store_id
    }
    return store
}

UserController.prototype.userLogin = async function(user: Users) {
    const result: Users = await this.userService.userLogin(user)
    if(!result)
        throw new Error("Usuario ou senha invalidos")
    return result
}

UserController.prototype.accountRecovery = async function(user: Users) {
    const result: Users = await this.userService.accountRecovery(user)
    return result
}

UserController.prototype.getUser = async function(userId: number, usr: any): Promise<Users> {
    let store = this.getStore(usr)
    return this.userService.getUser(userId, store.id)
}

UserController.prototype.getUsers = async function(user: any): Promise<Users[]> {
    const store: Store = this.getStore(user)
    return this.userService.getUsers(store)
}

UserController.prototype.saveRegister = async function(user: Users): Promise<Users> {
    return this.userService.saveRegister(user)
}

UserController.prototype.saveUser = async function(user: Users): Promise<Users> {
    return this.userService.saveUser(user)
}

UserController.prototype.updateUser = async function(user: Users, usr: any): Promise<Users> {
    const store = this.getStore(usr)
    user.store = store
    return this.userService.updateUser(user)
}

UserController.prototype.deleteUser = async function(user: Users, usr: any): Promise<void> {
    const store = this.getStore(usr)
    user.store = store
    return this.userService.deleteUser(user)
}


const userController = new (UserController as any)
export { userController } 

