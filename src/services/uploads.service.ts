import { Company } from "../model/company.model"
import { Uploads } from "../model/uploads.model"
import { uploadsRepository } from "../repository/uploads.repository"

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
        if(!upl)
            throw new Error("upload nao encontrado")
            uploads.updated_at = new Date
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
        return {message: "upload deletado"}
    } catch(e) {
        throw new Error(e.message)
    }
}

const uploadsService = new (UploadsService as any)
export { uploadsService }
