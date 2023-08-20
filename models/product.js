const path = require('path');
const fs = require('fs');

const rootDir = require('../helper/path');

const filePath = path.join(rootDir, 'data', 'products.json');

function getFileData() {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    if (fileContent === "") return [];
    return JSON.parse(fileContent);
}

class Product {
    constructor(title) {
        this.title = title
    }
    save() {
        const products = getFileData();
        products.push(this);
        fs.writeFile(filePath, JSON.stringify(products), err => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Data has been successfully writen in the file");
            }
        })

    }

    static fetchAll() {
        return getFileData();
    }
}

module.exports = Product;