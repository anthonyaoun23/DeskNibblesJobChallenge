const got = require('got');

let set1 = new Set([]);
let productsMap = {};

got('https://ca.desknibbles.com/products.json?limit=250', { json: true }).then(response => {
  // response.body = JSON stuff
  let products = response.body['products'];

  /* Write your code down here */
  
  for(let i = 0; i < products.length; i++){
      if(products[i]['variants']['0']['taxable']){
        productsMap[(products[i]['title'])] = products[i]['variants']['0']['price'] * 1.13;  
      } else {
        productsMap[(products[i]['title'])] = products[i]['variants']['0']['price'];  
      }
  }

}).catch(error => {
  console.log(error.response.body);
});

got('https://s3.amazonaws.com/misc-file-snack/MOCK_SNACKER_DATA.json', { json: true }).then(response => {
  // response.body = JSON stuff
  let people = response.body; 
  let total = 0;

  for(let i = 0; i < people.length; i++){
      let fave_snack = people[i]['fave_snack'];
      if(fave_snack in productsMap){
          console.log(people[i]['email']);
          console.log(fave_snack);
          total += productsMap[fave_snack];
      }
  }
  console.log(productsMap);
  console.log(total);

}).catch(error => {
  console.log(error.response.body);
});