import { db } from "../services/db.service"
import format from "pg-format"
import { Users } from "../model/user.model"

function UsersRepository(){
    this.db = db
}

UsersRepository.prototype.getUser = async function(user: Users):Promise<Users> {
    const query = `SELECT * FROM Users WHERE email = $1`
    return this.db.query(query, [user.email])
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
    const query = format(`INSERT INTO Users(name, email, password, role, company_id, createdat) VALUES (%L) RETURNING *`, Object.values(payload)) 
    return this.db.query(query)
}
const userRepository = new (UsersRepository as any)
export { userRepository }
