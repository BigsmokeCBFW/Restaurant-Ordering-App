import { menuArray } from "./data.js";
import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid@8.3.2';

const menuEl = document.getElementById('menu-container')
const tabContainer = document.getElementById('tab-container')
const tabArray = []

function render() {
  menuEl.innerHTML = menuArray.map((menu) =>{
    const {name, ingredients, price, emoji, id } = menu
    return `
      <div class="menu">
                    <h3 class="emoji">${emoji}</h3>
                    <span class="menu-detail">
                        <h4 class="menu-title">${name}</h4>
                        <p class="menu-ingredient">${ingredients}</p>
                        <h4 class="menu-price">$${price}</h4>
                    </span>
                    <button class="add-menu" id="${id}">+</button>
                </div>
    `
  } ).join("")
}

render()

document.addEventListener('click', (e) => {
  if(e.target.id){
    addToTab(Number(e.target.id))
  }else if(e.target.dataset.remove){
    console.log(e.target.dataset.remove)
  }
})

function addToTab(foodId){

  const foodObj = menuArray.filter(item => item.id === foodId)[0]

  tabArray.push({name: foodObj.name,
              price: foodObj.price,
              uuid: uuidv4()})

  console.log(tabArray)
}

function renderTab(){
  tabContainer.innerHTML = tabArray.map( tab =>{
    return`
    
    `
  }

  )
}

