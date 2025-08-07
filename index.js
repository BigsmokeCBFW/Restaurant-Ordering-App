import { menuArray } from "./data.js";

const menuEl = document.getElementById('menu-container')

function render() {
  menuEl.innerHTML = menuArray.map((menu) =>{
    const {name, ingredients, price, emoji } = menu
    return `
      <div class="menu">
                    <h3 class="emoji">${emoji}</h3>
                    <span class="menu-detail">
                        <h4 class="menu-title">${name}</h4>
                        <p class="menu-ingredient">${ingredients}</p>
                        <h4 class="menu-price">$${price}</h4>
                    </span>
                    <button class="add-menu">+</button>
                </div>
    `
  } ).join("")
}

render()