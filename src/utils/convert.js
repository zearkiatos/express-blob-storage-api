const jsonTocsv = (data, separator = ',') => {
    let csv = "";
    const headers = Object.keys(data[0]);
    csv = headers.join(separator);
    csv = csv.concat('\n');

    for(let item of data) {
        let row = "";
        row = Object.values(item).join(separator);
        csv = csv.concat(row);
        csv = csv.concat('\n');
    }

    return csv;
}

export {
    jsonTocsv
}