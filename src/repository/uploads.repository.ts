import { db } from "../services/db.service"
import format from "pg-format"
import os from "os"
import dns from "dns"
import { Uploads } from "../model/uploads.model"
function UploadsRepository(){
    this.db = db
}
let ipAddr: any
const getLocalIp = function() {
    dns.lookup(os.hostname(), function(err, addr, fam) {
        ipAddr = addr + ':' + process.env.SERVER_PORT + '/'
    })
}()

UploadsRepository.prototype.getUploads = async function(companyId: number) {
    const query = `SELECT u.id, u.name, '${ipAddr}' || u.path as path, u.created_at, u.updated_at
    FROM uploads u
    WHERE u.company_id = $1
    `
    return this.db.query(query, [companyId])    
}

UploadsRepository.prototype.getUpload = async function(uploadId: number, companyId: number) {
    const query = `SELECT u.id, u.name, '${ipAddr}' || u.path as path, u.created_at, u.updated_at
    FROM uploads u
    WHERE u.id = $1
    AND u.company_id = $2
    `
    return this.db.query(query, [uploadId, companyId])    
}

UploadsRepository.prototype.saveUpload = async function(uploads: Uploads) {
    let payload = {
        name: uploads.name,
        path: uploads.path,
        company_id: uploads.company.id,
        created_at: uploads.created_at
    }
    console.log(payload)
    const query = format(`INSERT INTO uploads("name", "path", "company_id", "created_at") VALUES (%L) RETURNING *`, Object.values(payload)) 
    return this.db.query(query)
}

UploadsRepository.prototype.updateUpload = async function(uploads: Uploads) {
    let payload = {
        id: uploads.id,
        name: uploads.name,
        path: uploads.path,
        updated_at: uploads.updated_at,
    }
    console.log("entrou ", payload)
    const query = `UPDATE uploads SET "name" = $2, "path" = $3, "updated_at" = $4 WHERE id = $1 RETURNING *`
    return this.db.query(query, Object.values(payload))
}

UploadsRepository.prototype.deleteUpload = async function(uploads: Uploads) {
    const query = `DELETE 
    FROM uploads u
    WHERE u.id = $1
    `
    return this.db.query(query, [uploads.id])    
}

const uploadsRepository = new UploadsRepository
export { uploadsRepository }