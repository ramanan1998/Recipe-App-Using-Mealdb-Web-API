

function inDisp(elem,href,area){              // Boiler plate html product class contents to insert according to the click event
    let gen = `<div class="products">
        <div class="upper_buttons">
            <button class="like"><i class="fa-solid fa-heart"></i></button>
        </div>
        <img src="${elem.strMealThumb}" alt="image" class="product">
        <div class="product_info">
            <h3>${elem.strMeal}</h3>
        </div>
        <div class="get_recipe"><a href="${href}" class="recipe_button">Get Recipe</a><span>${area}</span></div>
        </div>`;
        
    productContainer.insertAdjacentHTML("beforeend", gen);
}




function focused(clickme){                      // styling menu class while click event
    menu.forEach(i => {
        i.classList.remove("foc")               //Removes foc class from all the menu class
    });
    clickme.classList.add("foc");               //Adds the foc class only for the given element
}

async function home(url){
    return await (await fetch(url)).json();     //Async function which returns json response of given argument
}

const menu = document.querySelectorAll(".menu");
const productContainer = document.querySelector(".product_container");

menu.forEach(butt => {                                                         
    butt.addEventListener("click", () => {                                  //Iterate through the array of buttons in the menu
        
        const elementName = butt.id;                                        //buttons's id which is the same value as text node
        
        home(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${elementName}`).then(data => {  //fetch the data of foods of id name
            const arr = data.meals;                 
            focused(butt);                          
            productContainer.textContent = "";                              //Removes the all the contents from the product container div
            arr.forEach(async (i) => {                                      
                await home(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${i.idMeal}`).then(data => { //fetch the data of foods which has the id
                    const val = data.meals[0].strYoutube;  
                    const area = data.meals[0].strArea;
                    inDisp(i,val,area);                                     //three arguments => i (data values fetched), val( returns youtube link from api), area(returns country from api)
                }).catch(err => {
                    console.log(err);
                })
                
            });

        }).catch(() => {
            productContainer.innerHTML = "<h1>Something Went Wrong</h1>";
        })
    })
})



