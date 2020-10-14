const categoryList = document.getElementById('category-list');

function getCategoryList() {
    queryFetch(`
    query {
        category{
        id,
        name
        }
    }
`).then(data => {
  data.data.category.forEach(categoryInfo => {
 
    if(categoryInfo) categoryList.innerHTML += getCategoryDiv(categoryInfo);

  })
});
}
getCategoryList();

function removeCategory(id) {
    console.log('id: ', id);
    id =id ? id : "5f86360b09470e08e0f4abd5";
    

    if(id) {
        queryFetch(`
            mutation {
                deleteCategory(id: "${id}") {
                    id, 
                    name
                }
            }
        `).then(data => {
            if(data.data) {
               return getCategoryList();
            }
        });
    }   
};


function queryFetch(query, variables) {
  
  return fetch('http://localhost:3000/graphiql', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  }).then(res => {
    return res.json()})
}

function getCategoryDiv (category) {    

    return `
        <div style="display: inline-block">
            <div class="dtc v-mid pl3 w15">
                <h1 class="f6 f5-ns fw6 lh-title black mv0"> ${category.name}</h1>
            </div>
            <div class="dtc v-mid w17">
            <div class="w-100 tr" style="display: inline-flex">
            <button  onClick="updateCategory()" class="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60"style="margin-right: 3px" >+ Edit
            </button>
            <button onClick ="removeCategory()" class="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" >- Remove</button>
    
            </div>
        </div>
        </div>`;
}