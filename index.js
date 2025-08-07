import { menuArray } from "./data.js";
import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid@8.3.2';

const menuEl = document.getElementById('menu-container')
const listContainer = document.getElementById('tab-list')
const tabSection = document.getElementById('tab-section')
const paymentForm = document.getElementById('payment-form')
const orderConfirmation = document.getElementById('order-confirmation')

let tabArray = []

render()

document.addEventListener('click', (e) => {
  if(e.target.id){
    if(e.target.id === 'check-out'){
      document.getElementById('payment-modal').style.display = 'block'
      tabArray.length = 0
      render()
    }else if( e.target.id >= 0 && e.target.id <= 2){
      addToTab(Number(e.target.id))
    }
  }else if(e.target.dataset.remove){
    removeFromTab(e.target.dataset.remove)
  }
})

document.addEventListener('submit', (e) => {
  handleSubmit(e)
})

function handleSubmit(event){
  event.preventDefault()
  const paymentData = new FormData(paymentForm)
  const fulName = paymentData.get('name')
  paymentForm.reset()

  orderConfirmation.style.display = "flex"
  orderConfirmation.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
  document.getElementById('name').textContent = fulName
  document.getElementById('payment-modal').style.display = 'none'
}

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

    if(tabArray.length > 0){
      tabSection.style.display = 'block'
      tabSection.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }else{
      tabSection.style.display = 'none'
    }

    orderConfirmation.style.display = "none"
}





function addToTab(foodId){

  const foodObj = menuArray.filter(item => item.id === foodId)[0]

  tabArray.push({name: foodObj.name,
              price: foodObj.price,
              uuid: uuidv4()})
  renderTab()
}

function removeFromTab(tabId){
    tabArray = tabArray.filter((tab) => tab.uuid !== tabId)
    renderTab()
}

function renderTab(){
  listContainer.innerHTML = tabArray.map( tab =>{
    return`<div class="tab-item">
                  <h5 class="item-name">${tab.name} <span class="remove" data-remove="${tab.uuid}">remove</span></h5>
                  <h5>$${tab.price}</h5>
              </div>
    `
  }).join("")

  const totalPrice = tabArray.reduce((total, nextItem) => {
    return total + nextItem.price
  }, 0)

  document.getElementById('total-price').textContent = `$${totalPrice}`
  render()
}


