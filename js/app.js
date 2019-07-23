'use strict';

var productOneEl = document.getElementById('productOne');
var productTwoEl = document.getElementById('productTwo');
var productThreeEl = document.getElementById('productThree');
var productContainerEl = document.getElementById('productContainer');
var voteCount = 0;

var recentRandomProduct = [];
var allProducts =[];

function Products(name, filetype){
  this.name = name;
  this.filepath = `img/${name}.${filetype}`;
  this.votes = 0;
  this.views = 0;

  allProducts.push(this);
}

new Products('bag','jpg');
new Products('banana', 'jpg');
new Products('bathroom', 'jpg');
new Products('boots', 'jpg');
new Products('breakfast', 'jpg');
new Products('bubblegum', 'jpg');
new Products('chair', 'jpg');
new Products('cthulhu', 'jpg');
new Products('dog-duck', 'jpg');
new Products('dragon', 'jpg');
new Products('pen', 'jpg');
new Products('pet-sweep', 'jpg');
new Products('scissors', 'jpg');
new Products('shark', 'jpg');
new Products('sweep', 'png');
new Products('tauntaun', 'jpg');
new Products('unicorn', 'jpg');
new Products('usb', 'gif');
new Products('water-can', 'jpg');
new Products('wine-glass', 'jpg');

function render(){
  var randomProducts = getUniqueProduct();
  //console.log('This is the random product: ', randomProducts);
  allProducts[randomProducts].views++;
  productOneEl.src = allProducts[randomProducts].filepath;
  productOneEl.alt = allProducts[randomProducts].name;
  productOneEl.title = allProducts[randomProducts].name;

  randomProducts = getUniqueProduct();
  allProducts[randomProducts].views++;
  productTwoEl.src = allProducts[randomProducts].filepath;
  productTwoEl.alt = allProducts[randomProducts].name;
  productTwoEl.title = allProducts[randomProducts].name;

  randomProducts = getUniqueProduct();
  allProducts[randomProducts].views++;
  productThreeEl.src = allProducts[randomProducts].filepath;
  productThreeEl.alt = allProducts[randomProducts].name;
  productThreeEl.title = allProducts[randomProducts].name;
}

//helper functions!!

function randomNumber(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUniqueProduct(){
  var randomIndex = randomNumber(0, allProducts.length - 1);
  while(recentRandomProduct.includes(randomIndex)){
    randomIndex = randomNumber(0, allProducts.length -1);
  }
  if(recentRandomProduct.length > 5){
    recentRandomProduct.shift();
  }
  recentRandomProduct.push(randomIndex);
  //console.log('My random index is: ', randomIndex);
  return randomIndex;
}

function handleClick(){
  var chosenProduct = event.target.title;
  voteCount++;

  for(var i = 0; i < allProducts.length; i++){
    if(allProducts[i].name === chosenProduct){
      allProducts[i].votes++;
    }
  }
  if (voteCount > 24){
    productContainerEl.removeEventListener('click', handleClick, true);
  }
  render();
}
productContainerEl.addEventListener('click', handleClick, true);

render();
