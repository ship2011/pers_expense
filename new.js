const obj = JSON.parse(localStorage.getItem('obj')) || ''
//console.log(obj)
let ob =  [...obj] || [];
let html = '';



document.querySelector('.lupdate').addEventListener('click', () => dicT.getData())
document.querySelector('.lclear').addEventListener('click', () => {
    const result = window.confirm("Are you sure you want to wipe all records?");
    if (result) {
         dicT.clearData()
         alert('All Records have been wiped out')
    } else {
        alert('Request has been cancled to wipe data')
        
    }
})

const dicT = {  
    
    getData:  function getData() {
            const item = document.querySelector('.item').value;
            const price = document.querySelector('.price').value;
            //let total = document.querySelector('.total');
            //const record = document.querySelector('.js-list');
            const inputdate = document.querySelector(".js-date").value;

            if (!item || !Number(price))   {
                alert('you should enter price in Number Format')
            } else {
            ob.push({item: item, price: price, date: inputdate })
            this.renderData()
           
    }

    localStorage.setItem('obj', JSON.stringify(ob));
},

  renderData : function renderData() {
    let total = document.querySelector('.total');
    const record = document.querySelector('.js-list');
    let tot = 0;
    //Sort Function
    ob.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });
    //end here
    ob.forEach((value, index) => {

        //console.log(value.item, value.price);
        tot += Number(value.price)
        html +=  `<div>${value.item}</div>
            <div>${value.price}Rs.</div>
            <div>${value.date}</div>
            <button class="wipe-record delb" onclick="ob.splice(${index}, 1);dicT.renderData()" data-id="${index}">Delete</button>`
                    
    })
    total.innerHTML = `Total Expense :${tot}`;
    record.innerHTML = html;
    localStorage.setItem('obj', JSON.stringify(ob))
    html = ''
  },

  clearData() {
    localStorage.clear(obj)
    let total = document.querySelector('.total')
    
    total.innerHTML = ''
    ob = []
    let record = document.querySelector('.js-list');
    record.innerHTML = '';
    this.renderData()
    console.log('done')
}
}


dicT.renderData()

// function deleteData() {
//     const buttons = document.querySelectorAll('.wipe-record')
//     console.log(buttons)

//     buttons.forEach(function(button) {
//         button.addEventListener('click', function() {
//         // Get the value of the data-custom-value attribute
//         const num = button.getAttribute('data-id');
//         ob.splice(Number(num), 1)
//         console.log(ob)
//         localStorage.setItem('obj', JSON.stringify(ob));
//         dicT.renderData()

//         })
// })
// }

// document.querySelector('.wipe-record').addEventListener('click', () => deleteData())
