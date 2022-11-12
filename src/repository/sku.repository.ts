import { db } from "../services/db.service"
import format from "pg-format"
import { Client } from "../model/client.model"
import { Sku } from "../model/sku.model"

function SkuRepository(){
    this.db = db
}

SkuRepository.prototype.getSkus = async function(companyId: number) {
    const query = `SELECT s.id, s.name, s.description, s.active, s.created_at, s.updated_at,    
    json_strip_nulls(json_agg(json_build_object('id', si.id, 'url', si.url, 'name', si.name, 'created_at', si.created_at, 'updated_at', si.updated_at))) AS image
    FROM sku s
    LEFT JOIN sku_image si ON si.sku_id = s.id
    WHERE s.company_id = $1
    GROUP BY 
    s.id,
    s.name,
    s.description,
    s.active,
    s.created_at,
    s.updated_at
    `
    return this.db.query(query, [companyId])    
}

SkuRepository.prototype.getSku = async function(skuId: number) {
    const query = `SELECT s.id, s.name, s.description, s.active, s.created_at, s.updated_at,    
    json_strip_nulls(json_agg(json_build_object('id', si.id, 'url', si.url, 'name', si.name, 'created_at', si.created_at, 'updated_at', si.updated_at))) AS image
    FROM sku s
    LEFT JOIN sku_image si ON si.sku_id = s.id
    WHERE s.id = $1
    GROUP BY 
    s.id,
    s.name,
    s.description,
    s.active,
    s.created_at,
    s.updated_at
    `
    return this.db.query(query, [skuId])    
}

SkuRepository.prototype.saveSku = async function(sku: Sku) {
    const skus = new Array
    const payload = {
        name: sku.name,
        description: sku.description,
        active: sku.active,
        company_id: sku.company.id,
        created_at: sku.created_at
    }
    const query = format(`INSERT INTO Sku("name", "description", "active", "company_id", "created_at") VALUES (%L) RETURNING *`, Object.values(payload)) 
    const sk = await this.db.query(query)
    sku.image.forEach(item => {
        let pld = {
            id: sk.rows[0].id,
            name: item.name,
            url: item.url,
            created_at: new Date,
            company_id: sk.rows[0].company_id
        }
        skus.push(Object.values(pld))
    })
    const addrs = format(`INSERT INTO sku_image("sku_id","name","url", "created_at", "company_id") VALUES %L RETURNING *;`, skus)
    const result = await this.db.query(addrs)
    let skSaved: Sku = {...sk.rows[0]}
    skSaved.image = result.rows
    return skSaved
}

SkuRepository.prototype.updateSku = async function(sku: Sku) {
    console.log("entrou ", sku)
    const skus = new Array
    const payload = {
        id: sku.id,
        name: sku.name,
        description: sku.description,
        active: sku.active,
        updated_at: sku.updated_at
    }
    // const query = format(`INSERT INTO Sku("name", "description", "active", "updated_at") VALUES (%L) RETURNING *`, Object.values(payload)) 
    const query = `UPDATE Sku SET "name" = $2, "description" = $3, "active" = $4, "updated_at" = $5 WHERE id = $1 RETURNING *`
    const sk = await this.db.query(query, Object.values(payload))
    sku.image.forEach(item => {
        let pld = {
            id: sk.rows[0].id,
            name: item.name,
            url: item.url,
            created_at: new Date,
            company_id: sk.rows[0].company_id
        }
        skus.push(Object.values(pld))
    })
    const del_skus = `DELETE FROM sku_image WHERE sku_id = $1`
    await this.db.query(del_skus, [sku.id])
    
    const addrs = format(`INSERT INTO sku_image("sku_id","name","url", "created_at", "company_id") VALUES %L RETURNING *;`, skus)
    const result = await this.db.query(addrs)
    let skSaved: Sku = {...sk.rows[0]}
    skSaved.image = result.rows
    return skSaved
}

SkuRepository.prototype.deleteSku = async function(sku: Sku) {
    const query = `DELETE 
    FROM Sku c
    WHERE c.id = $1
    `
    return this.db.query(query, [sku.id])    
}
const skuRepository = new SkuRepository
export { skuRepository }
