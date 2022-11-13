import { Company } from "../model/company.model"
import { Uploads } from "../model/uploads.model"
import { uploadsRepository } from "../repository/uploads.repository"
import fs from "fs"
import path from "path"

function UploadsService() {
    this.uploadsRepository = uploadsRepository
}

UploadsService.prototype.getUploads = async function(company: Company) {
    try {
        const result = await this.uploadsRepository.getUploads(company.id)
        return result.rows
    } catch(e) {
        throw new Error(e.message)
    }
}

UploadsService.prototype.getUpload = async function(uploadId: number, companyId: number) {
    try {
        const result = await this.uploadsRepository.getUpload(uploadId, companyId)        
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

UploadsService.prototype.saveUpload = async function(uploads: Uploads) {
    try {
        uploads.created_at = new Date
        const result = await this.uploadsRepository.saveUpload(uploads)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

UploadsService.prototype.updateUpload = async function(uploads: Uploads) {
    try {
        let upl = await this.getUpload(uploads.id, uploads.company.id)
        const oldPath = path.resolve('./src/uploads/'+upl.name)
        const newPath = path.resolve('./src/uploads/'+uploads.name)
        if(uploads.name != upl.name) {
            fs.rename(oldPath, newPath, () => {
                console.log("arquivo renomeado")
            })
        }
        if(!upl)
            throw new Error("upload nao encontrado")
        uploads.updated_at = new Date
        uploads.path = 'uploads/' + uploads.name
        const result = await this.uploadsRepository.updateUpload(uploads)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

UploadsService.prototype.deleteUpload = async function(uploads: Uploads) {
    try {
        let upl = await this.getUpload(uploads.id, uploads.company.id)
        if(!upl)
            throw new Error("upload nao encontrado")
        await this.uploadsRepository.deleteUpload(uploads)
        const filePath = path.resolve('./src/uploads/'+uploads.name)
        fs.unlink(filePath, (err) => {
            if(err) console.error("arquivo ja deletado")
        })
        return {message: "arquivo upload deletado"}
    } catch(e) {
        throw new Error(e.message)
    }
}

const uploadsService = new (UploadsService as any)
export { uploadsService }
