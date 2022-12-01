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
    let inter = os.networkInterfaces().Ethernet.find(it => it.family == 'IPv4')
    ipAddr = inter.address + ':' + process.env.SERVER_PORT + '/'
}()

UploadsRepository.prototype.getUploads = async function(storeId: number) {
    const query = `SELECT u.id, u.name, '${ipAddr}' || u.path as path, u.created_at, u.updated_at
    FROM uploads u
    WHERE u.store_id = $1
    `
    return this.db.query(query, [storeId])    
}

UploadsRepository.prototype.getUpload = async function(uploadId: number, storeId: number) {
    const query = `SELECT u.id, u.name, '${ipAddr}' || u.path as path, u.created_at, u.updated_at
    FROM uploads u
    WHERE u.id = $1
    AND u.store_id = $2
    `
    return this.db.query(query, [uploadId, storeId])    
}

UploadsRepository.prototype.saveUpload = async function(uploads: Uploads) {
    let payload = {
        name: uploads.name,
        path: uploads.path,
        store_id: uploads.store.id,
        created_at: uploads.created_at
    }
    const query = format(`INSERT INTO uploads("name", "path", "store_id", "created_at") VALUES (%L) RETURNING *`, Object.values(payload)) 
    return this.db.query(query)
}

UploadsRepository.prototype.updateUpload = async function(uploads: Uploads) {
    let payload = {
        id: uploads.id,
        name: uploads.name,
        path: uploads.path,
        updated_at: uploads.updated_at,
    }
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
