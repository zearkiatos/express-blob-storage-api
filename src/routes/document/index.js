import fs, { ReadStream } from 'fs';
import httpStatusCodes from 'http-status-codes';
import { jsonTocsv } from '@utils/convert';
import azureBlobStorageClient from '@clients/azure/blobStorageClient'
import { streamToBuffer } from '@utils/stream';

const document = (app) => {
    app.post(`/api/document`, async (request, response) => {
        const data =  [
            { firstName: 'Russell', lastName: 'Castillo', age: 23 },
            { firstName: 'Christy', lastName: 'Harper', age: 35 },
            { firstName: 'Eleanor', lastName: 'Mark', age: 26 },
          ];
        
        const csv = jsonTocsv(data, ";");
        const blobName = `document-${Date.now()}`;
        // const stream = fs.createWriteStream(`./tmp/${blobName}.csv`);

        // stream.write(csv);
        // const readableStream = fs.createReadStream(`./tmp/${blobName}.csv`);

        // const bufferContent = await streamToBuffer(readableStream);
    
        await azureBlobStorageClient.uploadContent(blobName, csv, 'text/csv');

        // fs.rm(`./tmp/${blobName}.csv`, function() {
        //     stream.close();
        // });
        
        response.status(httpStatusCodes.OK);
        response.send({
            blobName,
            csv
        })
    });
};

export default document;