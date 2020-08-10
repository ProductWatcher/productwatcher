const fs = require('fs');
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const faker = require('faker');

// const csvWriter = createCsvWriter({
//   path: '../CSV/products.csv',
//   header: [
//     {id: 'product_id', title:'PRODUCT_ID'},
//     {id: 'product_name', title: 'PRODUCT_NAME'},
//     {id: 'link_to', title: 'LINK_TO'},
//     {id: 'img', title: 'IMG'}
//   ]
// });

// const records = [
//   {name: 'Bob',  lang: 'French, English'},
//   {name: 'Mary', lang: 'English'}
// ];

// csvWriter.writeRecords(records)       // returns a promise
// .then(() => {
//     console.log('...Done');
// });

const writeProducts = fs.createWriteStream('../CSV/products.csv');
writeProducts.write('product_id,product_name,link_to,img\n', 'utf8');
const writePrices = fs.createWriteStream('../CSV/prices.csv');
writePrices.write('date_of,id_of\n', 'utf-8');

/* 
productWriter

decrement i
set varaibles and generate fake data

for every one product
  generate 10 price points with a given ID

if i is zero
  write to file

otherwise
drain and write


*/

const writeFiveHundredThousand = (productWriter, priceWriter, encoding, callback) => {
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  };

  let i = 500000;
  let id = 2000
  
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      const incrementBy = getRandomIntInclusive(1,255);
      const product_id = id += incrementBy;
      const product_name = faker.commerce.productName();
      const product_url = product_name.split(' ').join('-')
      const targetURL = `https://www.target.com/${product_url}/-/A-${id}`
      const link_to = targetURL;
      const img =  faker.image.imageUrl();
      const productData = `${product_id},${product_name},${product_url},${link_to},${link_to},${img}\n`;

      if (i === 0) {
        productWriter.write(productData, encoding, callback);
      } else {
        ok = productWriter.write(productData, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      productWriter.once('drain', write);
    }
  }
  write();
}

writeFiveHundredThousand(writeProducts, null, 'utf-8', () => {
  writeProducts.end();
})