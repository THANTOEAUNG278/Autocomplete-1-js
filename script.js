
let products =[];

const productItem = async () => {
  const response = await fetch('https://fakestoreapi.com/products')
  console.log("res",response)
  const data = await response.json()
  products = data
  // return products
}
productItem().catch(Error=>console.log(Error))
console.log("pp",products)

const autocompletetag = document.getElementsByClassName('autocomplete')[0];

const resultContainerTag = document.getElementsByClassName('resultContainer')[0];
const enterProduct = document.getElementsByClassName('enterproduct')

let filtterproducts = [];

autocompletetag.addEventListener('keyup', (event) =>{

  if (
    event.key === "ArrowDown" ||
    event.key === "ArrowUp" ||
    event.key === "Enter" 
  ) {
    naigateAndSelectProduct(event.key);
    return;
  }
  resultContainerTag.innerHTML = '';
  const seacchText = event.target.value;
  if (seacchText.length === 0){
    return;
  }
  filtterproducts = products.filter(product => product.title.toLowerCase().includes(seacchText))
  
  const productToShow = filtterproducts.length > 0;
  if (productToShow){
    resultContainerTag.innerHTML = '';
    for (let i = 0; i < filtterproducts.length; i++){
      const productContainer = document.createElement('div');
      productContainer.id = filtterproducts[i].id;
      productContainer.classList.add('productContainer')


      const productName = document.createElement('div');
      productName.classList.add('productName')
      productName.append(filtterproducts[i].title)

      const productImage = document.createElement('img');
      productImage.classList.add('productImage')
      productImage.src = filtterproducts[i].image

      productContainer.append(productName,productImage)
      resultContainerTag.append(productContainer)

    }
  }
})
let indexToSelect = -1;
const naigateAndSelectProduct = (key) => {
  if (key === 'ArrowDown') {
    if (indexToSelect === filtterproducts.length-1){
      indexToSelect = -1
      deselectProduct()
      return
    }
    indexToSelect +=1;
    const productItemConjtainerSelect = selectProduct(indexToSelect)
    if (indexToSelect>0) {
      deselectProduct()
    }
    productItemConjtainerSelect.classList.add('selected')
  
  }else if (key === 'ArrowUp'){
    if(indexToSelect === -1){
      return
    }
    if (indexToSelect <= 0){
      indexToSelect = filtterproducts.length-1
    }else{
      indexToSelect -=1
    }
    deselectProduct()
    selectProduct(indexToSelect)
    const productItemConjtainerSelect = selectProduct(indexToSelect)
    productItemConjtainerSelect.classList.add('selected')
  }
  else {
    const enterSelectProduct = selectProduct(indexToSelect)
    console.log(enterSelectProduct)
  }
}
const deselectProduct = () => {
  const productToDeselete = document.getElementsByClassName('selected')[0];
  productToDeselete.style.backgroundColor = "white"
  productToDeselete.firstChild.style.color = "black"
  productToDeselete.classList.remove('selected')
}
const selectProduct = (index) => {
  const productIdToSelect = filtterproducts[index].id.toString();
  const productItemConjtainerSelect = document.getElementById(productIdToSelect);
  productItemConjtainerSelect.style.backgroundColor = "blue"
  productItemConjtainerSelect.firstChild.style.color = "white"
  return productItemConjtainerSelect
}
