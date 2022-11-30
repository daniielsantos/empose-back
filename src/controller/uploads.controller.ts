import { Store } from "../model/store.model"
import { Uploads } from "../model/uploads.model"
import { uploadsService } from "../services/uploads.service"

function UploadsController() {
    this.uploadsService = uploadsService
}

UploadsController.prototype.getStore = function(user: any): Store {
    const store: Store = {
        id: user.store_id
    }
    return store
}

UploadsController.prototype.getUploads = async function(user: any): Promise<Uploads[]> {
    const store: Store = this.getStore(user)
    return this.uploadsService.getUploads(store)
}

UploadsController.prototype.getUpload = async function(uploadId: number, user: any): Promise<Uploads> {
    const store = this.getStore(user)
    return this.uploadsService.getUpload(uploadId, store.id)
}

UploadsController.prototype.saveUpload = async function(uploads: Uploads, user: any): Promise<Uploads> {
    const store: Store = this.getStore(user)
    uploads.store = store
    return this.uploadsService.saveUpload(uploads)
}

UploadsController.prototype.updateUpload = async function(uploads: Uploads, user: any) {
    const store: Store = this.getStore(user)
    uploads.store = store
    return this.uploadsService.updateUpload(uploads)
}

UploadsController.prototype.deleteUpload = async function(uploads: Uploads, user: any) {
    const store: Store = this.getStore(user)
    uploads.store = store
    return this.uploadsService.deleteUpload(uploads)
}

const uploadsController = new (UploadsController as any)
export { uploadsController } 

