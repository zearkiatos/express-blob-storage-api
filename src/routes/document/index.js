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

        const stream = fs.createWriteStream("data.csv");
        const readableStream = fs.createReadStream("data.csv");

        readableStream.once('open', function(fd) {
            stream.write(csv);
            stream.end();
        });

        const read = readableStream.pipe(stream);
        const blobName = `document-${Date.now()}`;
        const bufferContent = await streamToBuffer(read);
    
        await azureBlobStorageClient.uploadContent(blobName, bufferContent);

        
        
        response.status(httpStatusCodes.OK);
        response.send({
            blobName,
            csv
        })
    });
};

export default document;