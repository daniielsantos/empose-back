import moment from "moment"
require('moment/locale/pt-br')
moment.locale('pt-br')

export default class DateUtil {
    static toFormat(date: Date, format: string) {
        return moment(date).format(format)
    }

    static formatAllDates(data: any[], format: string) {
        return data.map((item) => {
                if(item.address && Array.isArray(item.address)) {
                    return {
                        ...item,
                        created_at: this.toFormat(item.created_at, format),
                        updated_at: this.toFormat(item.created_at, format),
                        address: this.formatSubItemList(item.address, format)
                    }
                }
                if(item.images) {
                    return {
                        ...item,
                        created_at: this.toFormat(item.created_at, format),
                        updated_at: this.toFormat(item.created_at, format),
                        images: this.formatSubItemList(item.images, format)
                    }
                }
                return {
                    ...item,
                    created_at: item.created_at ? this.toFormat(item.created_at, format) : null,
                    updated_at: item.updated_at ? this.toFormat(item.updated_at, format) : null
                }
        })
    }

    static formatSubItemList(item: any[], format: string) {
            return item.map(it => {
                return {
                    ...it,
                    created_at: it.created_at ? this.toFormat(it.created_at, format) : null,
                    updated_at: it.updated_at ? this.toFormat(it.updated_at, format) : null
                }
            })
    }

}
