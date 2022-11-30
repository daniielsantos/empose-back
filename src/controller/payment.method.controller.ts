import { Store } from "../model/store.model"
import { PaymentMethods } from "../model/payment.method.model"
import { paymentMethodService } from "../services/payment.method.service"

function PaymentMethodController() {
    this.paymentMethodService = paymentMethodService
}

PaymentMethodController.prototype.getStore = function(user: any): Store {
    const store: Store = {
        id: user.store_id
    }
    return store
}

PaymentMethodController.prototype.getPaymentMethods = async function(user: any): Promise<PaymentMethods[]> {
    const store: Store = this.getStore(user)
    return this.paymentMethodService.getPaymentMethods(store)
}

PaymentMethodController.prototype.getPaymentMethod = async function(paymentId: number, user: any): Promise<PaymentMethods> {
    const store = this.getStore(user)
    return this.paymentMethodService.getPaymentMethod(paymentId, store.id)
}

PaymentMethodController.prototype.savePaymentMethod = async function(paymentMethod: PaymentMethods, user: any): Promise<PaymentMethods> {
    const store: Store = this.getStore(user)
    paymentMethod.store = store
    return this.paymentMethodService.savePaymentMethod(paymentMethod)
}

PaymentMethodController.prototype.updatePaymentMethod = async function(paymentMethod: PaymentMethods, user: any) {
    const store: Store = this.getStore(user)
    paymentMethod.store = store
    return this.paymentMethodService.updatePaymentMethod(paymentMethod)
}

PaymentMethodController.prototype.deletePaymentMethod = async function(paymentMethod: PaymentMethods, user: any) {
    const store = this.getStore(user)
    paymentMethod.store = store
    return this.paymentMethodService.deletePaymentMethod(paymentMethod)
}

const paymentMethodController = new (PaymentMethodController as any)
export { paymentMethodController } 

