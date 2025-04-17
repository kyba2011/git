let menuList = document.querySelector('#menuList')
let orderList = document.querySelector('#orderList')
let summa = document.querySelector('#summa')
let itemsCount = document.querySelector('#itemsCount')





const createMenu = (product) => {
    return `
    <div class="foodCard" onclick="clickMenu(event)" data-product='${JSON.stringify(product)}'>
        <img src="${product.img}" class="foodImg">
             <div>
                 <div> ${product.title}  </div>
                 <div> ${product.price} som </div>
             </div>
    </div>
    `
}

function renderMenu(list) {
    let items = []
    list.map( (el) => {
        items.push(createMenu(el))
    } )
    menuList.innerHTML = items.join('')
}

const createList = (menu) => {
    return`
     <li>
        <div> ${menu.title} </div>
        <div> ${menu.count} </div>
        <div> ${menu.price} </div>
        <div onclick="deleteMenu(event)" data-order='${JSON.stringify(menu)}' class="clear"> X </div>
    </li>
    `
}

const renderList = (list) => {
    let items = []
    list.map( (el) => {
        items.push(createList(el))
    } ) 
    orderList.innerHTML = items.join('')
}

const clickMenu = (event) => {
    let card = JSON.parse(event.currentTarget.dataset.product)
    let index = basket.findIndex( el => el.id == card.id)

    if( index ==  -1 ){
        basket.push({...card, count: 1})
    } else{
        basket[index].count ++
        basket[index].price += card.price
    }

    renderList(basket)
    plusSumma()
    plusCount()
}

const deleteMenu = (event) => {
    let item = JSON.parse(event.currentTarget.dataset.order)
    let index = basket.findIndex( el => el.id == item.id)
    let priceList = menuItems.find( el => el.id == item.id).price

    if(item.count > 1){
        basket[index].count --
        basket[index].price -= priceList
        renderList(basket)
    } else{
        basket.splice(index, 1)
        renderList(basket)
    }
    plusSumma()
    plusCount()
}

const plusSumma = () => {
    summa.innerHTML = basket.reduce( (el, {price}) => el + price, 0 )
}

const plusCount = () => {
    itemsCount.innerHTML = basket.reduce( (el, {count}) => el + count, 0 )
}

renderMenu(menuItems)

