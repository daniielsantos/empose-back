import bcrypt from 'bcrypt'

function Crypt() { /* TODO */ }

Crypt.prototype.hash = async function(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

Crypt.prototype.compare = async function(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
}
const crypt = new (Crypt as any)
export {
    crypt
}
