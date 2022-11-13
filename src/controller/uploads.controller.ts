import { Company } from "../model/company.model"
import { Uploads } from "../model/uploads.model"
import { uploadsService } from "../services/uploads.service"

function UploadsController() {
    this.uploadsService = uploadsService
}

UploadsController.prototype.getCompany = function(user: any): Company {
    const company: Company = {
        id: user.company_id
    }
    return company
}

UploadsController.prototype.getUploads = async function(user: any): Promise<Uploads[]> {
    const company: Company = this.getCompany(user)
    return this.uploadsService.getUploads(company)
}

UploadsController.prototype.getUpload = async function(uploadId: number, user: any): Promise<Uploads> {
    const company = this.getCompany(user)
    return this.uploadsService.getUpload(uploadId, company.id)
}

UploadsController.prototype.saveUpload = async function(uploads: Uploads, user: any): Promise<Uploads> {
    const company: Company = this.getCompany(user)
    uploads.company = company
    return this.uploadsService.saveUpload(uploads)
}

UploadsController.prototype.updateUpload = async function(uploads: Uploads, user: any) {
    const company: Company = this.getCompany(user)
    uploads.company = company
    return this.uploadsService.updateUpload(uploads)
}

UploadsController.prototype.deleteUpload = async function(uploads: Uploads, user: any) {
    const company: Company = this.getCompany(user)
    uploads.company = company
    return this.uploadsService.deleteUpload(uploads)
}

const uploadsController = new (UploadsController as any)
export { uploadsController } 

