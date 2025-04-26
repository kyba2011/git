let menuList = document.querySelector('#menuList')
let orderList = document.querySelector('#orderList')
let sum = document.querySelector('#sum')
let count = document.querySelector('#count')





const createMenu = (product) => {
    return `
    <div class="foodCard" onclick="clickMenu(event)" data-product='${JSON.stringify(product)}'>
        <img src="${product.img}" class="foodImg">
             <div>
                 <div> ${product.title}  </div>
                 <div> ${product.price}$ </div>
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
        <div> ${menu.price}$ </div>
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
    let index = bs.findIndex( el => el.id == card.id)

    if( index ==  -1 ){
        bs.push({...card, count: 1})
    } else{
        bs[index].count ++
        bs[index].price += card.price
    }
    renderList(bs)
    plusSum()
    plusCount()
}

const deleteMenu = (event) => {
    let item = JSON.parse(event.currentTarget.dataset.order)
    let index = bs.findIndex( el => el.id == item.id)
    let priceList = menuItems.find( el => el.id == item.id).price

    if(item.count > 1){
        bs[index].count --
        bs[index].price -= priceList
        renderList(bs)
    } else{
        bs.splice(index, 1)
        renderList(bs)
    }
    plusSum()
    plusCount()
}

const plusSum = () => {
    sum.innerHTML = bs.reduce( (el, {price}) => el + price, 0 )
}

const plusCount = () => {
    count.innerHTML = bs.reduce( (el, {count}) => el + count, 0 )
}

renderMenu(menuItems)

