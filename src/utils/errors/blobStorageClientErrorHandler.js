import httpStatusCode from 'http-status-codes'

class BlobStorageClientErrorHandler extends Error {
    constructor (message, statusCode = httpStatusCode.INTERNAL_SERVER_ERROR) {
        super(message)
        this.statusCode = statusCode
        Object.setPrototypeOf(this, BlobStorageClientErrorHandler.prototype)
    }

    getErrorMessage () {
        return `Something was wrong with the blob storage client: ${this.message}`
    }
}

export default BlobStorageClientErrorHandler