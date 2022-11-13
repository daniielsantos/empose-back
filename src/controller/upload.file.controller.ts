import { Response } from "express"
import { uploadFileService } from "../services/upload.file.service"
import { Req } from "../types/request"

function UploadFileController() {
    this.uploadFileService = uploadFileService
}

UploadFileController.prototype.uploadFile = async function(req: Req, res: Response) {
    await this.uploadFileService.uploadFile(req, res)
}

const uploadFileController = new (UploadFileController as any)
export { uploadFileController } 

