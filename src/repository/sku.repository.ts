import { db } from "../services/db.service"
import format from "pg-format"
import { Sku } from "../model/sku.model"
import { skuInventoryRepository } from "./sku.inventory"

function SkuRepository(){
    this.db = db
    this.skuInventoryRepository = skuInventoryRepository
}

SkuRepository.prototype.getSkus = async function(companyId: number) {
    const query = `SELECT s.id, s.name, s.description, s.active, s.price, s.created_at, s.updated_at,
    json_strip_nulls(json_build_object('id', p.id)) AS product,
    json_strip_nulls(json_agg(json_build_object('id', si.id, 'url', si.url, 'name', si.name, 'created_at', si.created_at, 'updated_at', si.updated_at))) AS images
    FROM sku s
    LEFT JOIN product p ON p.id = s.product_id
    LEFT JOIN sku_image si ON si.sku_id = s.id
    LEFT JOIN sku_inventory i ON i.sku_id = s.id
    WHERE s.company_id = $1
    GROUP BY 
    s.id,
    s.name,
    s.description,
    s.active,
    s.price,
    s.created_at,
    s.updated_at,
    i.id,
    p.id
    `
    return this.db.query(query, [companyId])    
}

SkuRepository.prototype.getSku = async function(skuId: number, companyId: number) {
    const query = `SELECT s.id, s.name, s.description, s.active, s.price, s.created_at, s.updated_at,    
    json_strip_nulls(json_build_object('id', p.id)) AS product,
    json_strip_nulls(json_agg(json_build_object('id', si.id, 'url', si.url, 'name', si.name, 'created_at', si.created_at, 'updated_at', si.updated_at))) AS images
    FROM sku s
    LEFT JOIN product p ON p.id = s.product_id
    LEFT JOIN sku_image si ON si.sku_id = s.id
    WHERE s.id = $1
    AND s.company_id = $2
    GROUP BY 
    s.id,
    s.name,
    s.description,
    s.active,
    s.price,
    s.created_at,
    s.updated_at,
    p.id
    `
    return this.db.query(query, [skuId, companyId])    
}

SkuRepository.prototype.saveSku = async function(sku: Sku) {
    const skus = new Array
    const payload = {
        name: sku.name,
        description: sku.description,
        active: sku.active,
        price: sku.price,
        product_id: sku.product.id,
        company_id: sku.company.id,
        created_at: sku.created_at
    }
    const query = format(`INSERT INTO Sku("name", "description", "active", "price", "product_id", "company_id", "created_at") VALUES (%L) RETURNING *`, Object.values(payload)) 
    const sk = await this.db.query(query)

    let skuInventory = {
        quantity: 0,
        sku_id: sk.rows[0].id,
        company_id: sku.company.id,
        created_at: sku.created_at
    }
    
    await this.skuInventoryRepository.saveSkuInventory(skuInventory)

    if(!sku.images)
        return sk.rows[0]
    sku.images.forEach(item => {
        let img = {
            id: sk.rows[0].id,
            name: item.name,
            url: item.url,
            created_at: new Date,
            company_id: sk.rows[0].company_id
        }
        skus.push(Object.values(img))
    })
    const imagesQuery = format(`INSERT INTO sku_image("sku_id","name","url", "created_at", "company_id") VALUES %L RETURNING *;`, skus)
    const result = await this.db.query(imagesQuery)

    let skSaved: Sku = {...sk.rows[0]}
    skSaved.images = result.rows
    return skSaved
}

SkuRepository.prototype.updateSku = async function(sku: Sku) {
    console.log("entrou sku update ", sku)
    const skus = new Array
    const payload = {
        id: sku.id,
        name: sku.name,
        description: sku.description,
        active: sku.active,
        price: sku.price,
        product_id: sku.product.id,
        updated_at: sku.updated_at
    }
    
    const query = `UPDATE Sku SET "name" = $2, "description" = $3, "active" = $4, "price" = $5, "product_id" = $6, "updated_at" = $7 WHERE id = $1 RETURNING *`
    const sk = await this.db.query(query, Object.values(payload))

    sku.images.forEach(item => {
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
    skSaved.images = result.rows
    return skSaved
}

SkuRepository.prototype.deleteSku = async function(sku: Sku) {
    const query = `DELETE 
    FROM Sku s
    WHERE s.id = $1
    `
    return this.db.query(query, [sku.id])    
}

SkuRepository.prototype.deleteSkuByProductId = async function(productId: number) {
    const query = `DELETE 
    FROM Sku s
    WHERE s.product_id = $1
    `
    return this.db.query(query, [productId])    
}
const skuRepository = new SkuRepository
export { skuRepository }
