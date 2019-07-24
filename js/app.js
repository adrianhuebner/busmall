'use strict';

var productOneEl = document.getElementById('productOne');
var productTwoEl = document.getElementById('productTwo');
var productThreeEl = document.getElementById('productThree');
var productContainerEl = document.getElementById('productContainer');
var votesRemaining = 0;
var productNames = [];
var totalVotes = [];
var top3Votes = [];
//var resultsList = document.getElementById('results');

// got this code from class, changed mine after I saw how clean it looked in class
var images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var recentRandomProduct = [];
var allProducts =[];

function Products(name){
  this.name = name.split('.')[0];
  this.filepath = `img/${name}`;
  this.votes = 0;
  this.views = 0;

  allProducts.push(this);
}

for(var i =0; i < images.length; i++){
  new Products(images[i]);
}

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

// helper functions!!
// function topVotes(){
//   var sorted = totalVotes.sort(function(a,b){return b-a})
//   console.log(sorted);
// }

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

function generateArrays(){
  for(var i =0; i < allProducts.length; i++){
    productNames.push(allProducts[i].name);
    totalVotes.push(allProducts[i].votes);
  }
  var sortVotes = totalVotes.sort();
  sortVotes.reverse();
  top3Votes.push(sortVotes[0]);
  top3Votes.push(sortVotes[1]);
  top3Votes.push(sortVotes[2]);
  console.log(sortVotes);
}

function handleClick(){
  var chosenProduct = event.target.title;
  votesRemaining++;

  for(var i = 0; i < allProducts.length; i++){
    if(allProducts[i].name === chosenProduct){
      allProducts[i].votes++;
    }
  }
  if (votesRemaining > 24){
    productContainerEl.removeEventListener('click', handleClick, true);
    generateArrays();
    generateChart();
    generatePie();
  }
  render();
}
productContainerEl.addEventListener('click', handleClick, true);

render();

function generateChart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: totalVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(130, 91, 169, 0.2)',
          'rgba(101, 145, 13, 0.2)',
          'rgba(240, 71, 91, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(130, 91, 169, 0.2)',
          'rgba(101, 145, 13, 0.2)',
          'rgba(240, 71, 91, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(130, 91, 169, 1)',
          'rgba(101, 145, 13, 1)',
          'rgba(240, 71, 91, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(130, 91, 169, 1)',
          'rgba(101, 145, 13, 1)',
          'rgba(240, 71, 91, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
function generatePie(){
  var ctx = document.getElementById('myPieChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Top 3 Voted for Items',
        data: top3Votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
