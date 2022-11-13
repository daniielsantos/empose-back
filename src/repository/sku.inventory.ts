import { db } from "../services/db.service"
import format from "pg-format"

function SkuInventoryRepository(){
    this.db = db
}

SkuInventoryRepository.prototype.getSkusInventory = async function(companyId: number) {
    const query = `SELECT si.id, si.quantity, si.sku_id, si.created_at, si.updated_at
    FROM sku_inventory si
    WHERE si.company_id = $1
    `
    return this.db.query(query, [companyId])    
}

SkuInventoryRepository.prototype.getSkuInventory = async function(skuInventoryId: number, companyId: number) {
    console.log("entrou ", skuInventoryId)
    console.log("entrou ", companyId)
    const query = `SELECT si.id, si.quantity, si.sku_id, si.created_at, si.updated_at 
    FROM sku_inventory sI
    WHERE si.id = $1
    AND si.company_id = $2
    `
    return this.db.query(query, [skuInventoryId, companyId])    
}

SkuInventoryRepository.prototype.saveSkuInventory = async function(skuInventory: any) {
    let inventory = {
        quantity: skuInventory.quantity,
        sku_id: skuInventory.sku_id,
        company_id: skuInventory.company_id,
        created_at: skuInventory.created_at
    }
    const inventoryQuery = format(`INSERT INTO Sku_inventory("quantity", "sku_id", "company_id", "created_at") VALUES (%L) RETURNING *`, Object.values(inventory))
    return this.db.query(inventoryQuery)
}

SkuInventoryRepository.prototype.updateSkuInventory = async function(skuInventory: any) {
    let payload = {
        id: skuInventory.id,
        quantity: skuInventory.quantity,
        updated_at: skuInventory.updated_at,
    }
    const query = `UPDATE sku_inventory SET "quantity" = $2, "updated_at" = $3 WHERE id = $1 RETURNING id, quantity, sku_id`
    return this.db.query(query, Object.values(payload))
}

const skuInventoryRepository = new SkuInventoryRepository
export { skuInventoryRepository }
