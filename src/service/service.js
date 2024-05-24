const fs = require('fs');
const { parse } = require('fast-csv')


module.exports = function readCsvFile(path) {
    return new Promise((resolve, reject) => {
        const list = [];
        fs.createReadStream(path)
            .pipe(parse({ headers: true }))
            .on('error', (error) => reject(error))
            .on('data', (row) => {
                const item = {};
                item.prompt = row.promt;
                item.completion = row.completion;
                list.push(item);
            })
            .on('end', (_rowCount) => {
                fs.unlink(path, error => {
                    if (error)
                        throw error;
                });
                resolve(list);
            });
    });
}