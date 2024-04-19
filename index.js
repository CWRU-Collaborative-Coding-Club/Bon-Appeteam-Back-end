const fs = require('fs');
const xml2js = require('xml2js');
var menuArray = [];

// Read the XML file
fs.readFile('./menu.xml', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Parse the XML data
  xml2js.parseString(data, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    // Little script to list each of the foods by name
    if (result && result.menu && result.menu.food) {
        result.menu.food.forEach(food => {
          if (food.title && food.title.length>0) {
            console.log(food.title[0]);
          }
        })
    }
    // Output the parsed XML
    //console.log(JSON.stringify(result, null, 2));

    //const menuArray = [];
    const includedArray = ['title','calories', 'carbs', 'protein', 'fat', 'sugars', 'sodium', 'dietaryfiber'];
   
    

    // Extract and populate the array
    if (result && result.menu && result.menu.food) {
      result.menu.food.forEach(food => {
        const foodArray = [];
        // Iterate over the keys in each food object
        Object.keys(food).forEach(key => {
          // Skip the id attribute
          
          if (includedArray.includes(key)){
            foodArray.push(food[key][0]);
          }
          
          
          //foodArray.push(food[key][0]);
        });
        // Add the foodArray to the menuArray
        menuArray.push(foodArray);
      });
    }

    // Output the two-dimensional array
    console.log(menuArray);

    menuArray = sortNut(menuArray);
    for (let i = 0; i < menuArray.length; i++) {
      console.log((menuArray[i][0]) + ", diff: ");
      console.log(scoreMeal(menuArray[i]));
    }
    
  });
});

const calpg = [4,4,9]

//Modified quicksort for sorting a list of foods
function sortNut(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  let pivot = arr[0];
  let leftArr = [];
  let rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (compareNut(arr[i], pivot)) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return [...sortNut(leftArr), pivot,...sortNut(rightArr)];
}

//Helper function to compare two foods 
function compareNut(arr1, arr2) {
  if (scoreMeal(arr1) < scoreMeal(arr2)) {
    return true; 
  }
  return false;
}

//for calculating nutrition deviation for a given food[]
function scoreMeal(arr){
  const cal = arr[1]
  const car = arr[2]
  const pro = arr[3]
  const fat = arr[4]

  const sugar = arr[5]  //50g advised for 2000 cal : .025g per cal
  const sodium = arr[6] //1500mg advised for 2000 cal : .75mg per cal
  const fiber = arr[7]  //28g advised for 2000 cal : .014g per cal
  
  //harcoded values for recommended macros, can be changed
  const cdiff = Math.abs(.45 - (car*4)/cal)
  const pdiff = Math.abs(.35 - (pro*4)/cal)
  const fdiff = Math.abs(.2 - (fat*9)/cal) 
  //hardcoded values for recommended sugar, sodium, fiber
  const sudiff = Math.abs(.025 - sugar/cal)
  const sodiff = Math.abs(.75 - sodium/cal)
  const fibdiff = Math.abs(.014 - fiber/cal)
  
  return (cdiff + pdiff + fdiff + sudiff + sodiff + fibdiff)/6;
  
}

