import { BlobServiceClient } from "@azure/storage-blob"
import { streamToBuffer } from "@utils/stream"
import config from '@config'
import BlobStorageClientErrorHandler from "@utils/errors/blobStorageClientErrorHandler"

const { STORAGE: { CONNECTION_STRING, CONTAINER_NAME }   } = config

let containerClient

const initializeBlobStorageClient = async () => {
    try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(CONNECTION_STRING)
        containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME)
        containerClient.createIfNotExists()
        console.log(`Created container ${CONTAINER_NAME} successfully`, { azureBlobStorageUrl: containerClient.containerContext.client.url })
    }
    catch(ex) {
        throw new BlobStorageClientErrorHandler(`Something went wrong while trying to initialize  azure blob storage : ${ex.message}`)
    }
}

async function uploadContent(blobName, content, blobContentType) {
    try {
        const blockBlobClient = containerClient.getBlockBlobClient(blobName)
        const options = {
            blobHTTPHeaders: {
                blobContentType
            }
        }
        return await blockBlobClient.upload(content, content.length, options)
    }
    catch(ex) {
        throw new BlobStorageClientErrorHandler(`Something went wrong while trying to upload into azure blob storage : ${ex.message}`)
    }
}

async function downloadContent(blobName) {
    try {
        const blockBlobClient = containerClient.getBlockBlobClient(blobName)
    
        const downloadBlockBlobResponse = await blockBlobClient.download()
        const contentFetched = (
            await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
        ).toString()
        return contentFetched
    }
    catch(ex) {
        throw new BlobStorageClientErrorHandler(`Something went wrong while trying to download from azure blob storage : ${ex.message}`)
    }
}

async function cleanUp() {
    await containerClient.delete()
}


export default {
    initializeBlobStorageClient,
    uploadContent,
    downloadContent,
    cleanUp
}