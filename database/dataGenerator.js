const fs = require('fs');
const faker = require('faker');
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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

/* 
func to genreate dates based on week increments
takes week

year stays at 2020
month starts at 08
day stats at 01

if week is 1
  return defaults

if week is 2
  day is 12 

....

if week is 6
  month is 09
  day is 5

if week is 7
  month is 09
  day is 12

if week is 8
month is 09
day is 19

if week is 9
month is 09
day is 26

if week is 10
month is 10
day is 3
*/
const writeProducts = fs.createWriteStream('../CSV/products.csv');
writeProducts.write('product_id,product_name,link_to,img\n', 'utf8');
const writePrices = fs.createWriteStream('../CSV/prices.csv');
writePrices.write('date_of,price,id_of\n', 'utf-8');


const dateGenerator = (week) => {
  if (week === 1) return '2020-08-01';
  if (week === 2) return '2020-08-08';
  if (week === 3) return '2020-08-15';
  if (week === 4) return '2020-08-22';
  if (week === 5) return '2020-08-29';
  if (week === 6) return '2020-09-05';
  if (week === 7) return '2020-09-12';
  if (week === 8) return '2020-09-19';
  if (week === 9) return '2020-09-26';
  if (week === 10) return '2020-10-3';
}

const writeFiveHundredThousand = (productWriter, priceWriter, encoding, callback) => {
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  };

  const genRand = (min, max, decimalPlaces) => {  
    var rand = Math.random()*(max-min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand*power) / power;
};

  let i = 500000;
  let id = 2000
  let week = 0;
  let price10Count = 10;
  let price = genRand(5,80,2);
  
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
      let priceOk = true;
        do {
            price10Count -= 1;
            if (week === 9) {
              week = 1
              price = genRand(5,80,2);
          }; //reset month to agust for new product
            if (week === 1) {week = 0}
            week += 1;
            const date_of = dateGenerator(week);
            const id_of = product_id;
            const priceChange = getRandomIntInclusive(1,5);
            const lessOrMore = getRandomIntInclusive(0,1);
            if (lessOrMore) {
              price += priceChange;
            } else {
              price -= priceChange;
            }
            const priceData = `${date_of},${price},${id_of}\n`;
            if (price10Count === 0) {
              priceWriter.write(priceData, encoding);
            } else {
              priceOk = priceWriter.write(priceData);
            }
        } while (price10Count > 0 && priceOk);
        if (price10Count > 0) {
          priceWriter.once('drain',write);
        }


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

writeFiveHundredThousand(writeProducts, writePrices, 'utf-8', () => {
  writeProducts.end();
  writePrices.end();
})
