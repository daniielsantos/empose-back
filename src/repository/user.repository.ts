import { db } from "../services/db.service"
import format from "pg-format"
import { Users } from "../model/user.model"
import { crypt } from "../services/bcrypt.service"

function UsersRepository(){
    this.db = db
    this.bcrypt = crypt
}

UsersRepository.prototype.getUserByEmail = async function(user: Users):Promise<Users> {
    const query = `SELECT u.id, u.name, u.email, u.password, u.role, u.company_id, u.created_at, u.updated_at FROM Users u WHERE email = $1`
    return this.db.query(query, [user.email])
}

UsersRepository.prototype.getUser = async function(userId: number, companyId: number):Promise<Users> {
    const query = `SELECT u.id, u.name, u.email, u.password, u.role, u.created_at, u.updated_at 
    FROM Users u WHERE id = $1
    AND u.company_id = $2
    `
    return this.db.query(query, [userId, companyId])
}

UsersRepository.prototype.getUsers = async function(companyId: number):Promise<Users[]> {
    const query = `SELECT u.id, u.name, u.email, u.password, u.role, u.created_at, u.updated_at 
    FROM Users u 
    WHERE company_id = $1`
    return this.db.query(query, [companyId])
}

UsersRepository.prototype.saveUser = async function(user: Users): Promise<Users> {
    if(!user.role)
        user.role = "manager"

    const payload = {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        company_id: user.company.id,
        createdAt: new Date
    }
    const query = format(`INSERT INTO Users(name, email, password, role, company_id, created_at) VALUES (%L) RETURNING *`, Object.values(payload)) 
    return this.db.query(query)
}

UsersRepository.prototype.updateUser = async function(user: Users) {
    let res = await this.getUser(user.id)
    let usr: Users = res.rows[0]
    delete usr.created_at
    usr.updated_at = user.updated_at
    if(user.name != usr.name)
        usr.name = user.name
    if(user.email != usr.email)
        usr.email = user.email
    if(user.password != usr.password)
        usr.password = await this.bcrypt.hash(user.password)         
    if(user.role != usr.role)
        usr.role = user.role

    const query = `UPDATE users SET "name" = $2, "email" = $3, "password" = $4, "role" = $5, "updated_at" = $6 WHERE id = $1 RETURNING *`
    const pay = await this.db.query(query, Object.values(usr))
    return pay
}

UsersRepository.prototype.deleteUser = async function(user: Users) {
    console.log(user)
    const query = `DELETE 
    FROM users u
    WHERE u.id = $1
    `
    return this.db.query(query, [user.id])    
}

const userRepository = new (UsersRepository as any)
export { userRepository }
