import path from "path"
import fs from "fs"
import formidable from "formidable"
import { Req } from "../types/request"
import { Response } from "express"
import { uploadsService } from "./uploads.service"
import { Uploads } from "../model/uploads.model"
import { Company } from "../model/company.model"

function UploadFileService() { 
    this.uploadsService = uploadsService
}

UploadFileService.prototype.getCompany = function(user: any) {
    const company: Company = {
        id: user.company_id
    }
    return company
}

UploadFileService.prototype.saveFile = async function(company: Company, fileName: string, filePath: string) {
    let uploadFile: Uploads = {
        name: fileName,
        path: filePath,
        company: company,
    }
    return this.uploadsService.saveUpload(uploadFile)
}

UploadFileService.prototype.uploadFile = async function(req: Req, res: Response) {
    try {
        let fileName, filePath
        const company = this.getCompany(req.user)
        const form = new formidable.IncomingForm();
        let uploadPath = path.resolve('./src/uploads') +'\\'

        await new Promise((resolve, reject) => {
            form.parse(req, function (err, fields, files) {
                const oldpath = files.file.filepath;
                fileName = files.file.originalFilename
                filePath = 'uploads/' + fileName
                const newpath = uploadPath + fileName
                if (err) reject('error');
                fs.rename(oldpath, newpath, function (err) {
                    if (err) reject('error');
                    resolve('done')
                });
            })
        })

        let fileSaved = await this.saveFile(company, fileName, filePath)
        res.send(fileSaved)
    } catch (e) {
        throw new Error("falha ao fazer upload "+e.message)
    }
}


const uploadFileService = new (UploadFileService as any)
export { uploadFileService }
