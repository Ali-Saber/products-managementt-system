let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let ads = document.getElementById('ads');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let mode = "create";
let temp;

//  get total price
function getTotal()
{
    if (price.value !='')
    {
        let result = (+price.value + +taxes.value + +ads.value )
        - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else
    {
        total.innerHTML = "";
        total.style.background = 'rgb(109, 20, 20)'
    }
}

// create products
// احسن مكان تحفظ فيه الداتا هو array 

let dataPro;
if (localStorage.products != null)
{
    dataPro = JSON.parse(localStorage.products);
} else
{
    dataPro = [];
}


create.onclick = function() 
{
    let newPro =
    {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
    } 
    // count & update
    if ( title.value != "" && price.value != "" && category.value != "")
    {
            if(mode == "create")
        {
            if (newPro.count > 1)
            {
                for( i=0 ; i < newPro.count ; i++)
                {
                    dataPro.push(newPro);
                }
            }else
            {
                dataPro.push(newPro);
            }
        } else 
        {
            dataPro[temp]=newPro;
            mode = "create";
            create.innerHTML = "create";
            count.style.display = "block";
        }
        cleardata();  
    }else{
        alert ("please enter the required data");
    }
   
    localStorage.setItem("products" , JSON.stringify(dataPro));        
    // لحفظ البيانات في ذاكرة التخزين الداخلية علي الجهاز
    showdata();
}
// clear inputs 

function cleardata()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read

function showdata()
{
    getTotal();
    //  اذا كان في array فيها داتا وعايز تاخد الداتا منها فلازم تعمل عليها loop
    let table = "";
    for ( let i = 0 ; i < dataPro.length ; i++)
    {
        table += 
        `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deletepro(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = table;
    let BtnDeleteAll = document.getElementById("deleteAll");
    if (dataPro.length > 0 )
    {
        BtnDeleteAll.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`
    } else 
    {
        BtnDeleteAll.innerHTML = "";
    }
}
showdata(); 
// delete

function deletepro(i)
{
    dataPro.splice(i,1);
    localStorage.products = JSON.stringify(dataPro);
    showdata();
}
function deleteAll()
{
    localStorage.clear();
    dataPro.splice(0);
    showdata();
}

// update

function updateData(i)
{
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    create.innerHTML = "Up date";
    mode = "update";
    temp = i;
    scroll({
        top : 0, 
        behavior:"smooth",
    })
}

// search
let searchmode = "title";

function getsearchMode(id)
{
    let search = document.getElementById("search");

    if ( id == "searchTitle")
    {
        searchmode = "title"
        search.placeholder = "Search By Title";
    } else
    {
        searchmode = "category"
        search.placeholder = "Search By Category";

    }
    search.focus();
    search.value = "";
    showdata();
}

function search(value)
{
    let table = "";
    for ( let i =0 ; i < dataPro.length ; i++ )
    {
        if( searchmode == "title" )
    {        
           if( dataPro[i].title.includes(value.toLowerCase()))
           {
            table += 
                    `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deletepro(${i})" id="delete">delete</button></td>
                    </tr>
                    `;
           }

    } else
    {  
    table += 
            `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deletepro(${i})" id="delete">delete</button></td>
            </tr>
            `;  
    }
    }
    document.getElementById("tbody").innerHTML = table;
}

// clean data

