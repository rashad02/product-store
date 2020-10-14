const productList = document.getElementById('product-list');

queryFetch(`
  query {
    products {
        id,
        productName,
        brandName,
        productDetails,
        productImage,
        productPrice,
        productCategory {
          id,
          name
        }
    }
  }
`).then(data => {
  data.data.products.forEach(product => {
    
    if(product) productList.innerHTML += getProductDiv(product);
  })
})

function queryFetch(query, variables) {
  return fetch('http://localhost:3000/graphiql', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  }).then(res => res.json())
}

function getProductDiv (product) {


return `<div style="display: inline-block"><div class="dtc w5 w5-ns v-mid">
        <img :src="${product.productImage}" class="ba b--black-10 db br2 w2 w3-ns h2 h3-ns"/>
      </div>
      <div class="dtc w12 v-mid pl3">
        <h1 class="f6 f5-ns fw6 lh-title black mv0">${product.productName} </h1>
      </div>
      <div class="dtc v-mid w7 pl3" style="margin: 10px 0px 10px 0" v-if="post.type">
        <h3 class="f6 f5-ns fw6 lh-title black mv0">${product.brandName} </h3>
      </div>
      <div class="dtc v-mid pl3 w17" style="margin: 10px 0px 10px 0; " >
        <h5 class="f6 f5-ns fw6 lh-title black mv0 truncate">${product.productDetails} </h5>
      </div>
      <div class="dtc v-mid pl3 w17" style="margin: 10px 0px 10px 0; " >
        <h5 class="f6 f5-ns fw6 lh-title black mv0 truncate">${product.productCategory.name} </h5>
      </div>
      <div class="dtc v-mid pl3 w12" style="margin: 10px 0px 10px 0; ">
        <h5 class="f6 f5-ns fw6 lh-title black mv0 truncate">${product.productPrice} </h5>
      </div> <div class="dtc v-mid w17">
      <div class="w-100 tr" style="display: inline-flex">

        <button class="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60"style="margin-right: 3px" >+ Edit
        </button>
        <button class="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60">- Remove</button>

      </div>
    </div>
    </div>
     `;
}