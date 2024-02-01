const countValue = document.querySelector('#counting'); 

const increment = () => {
    // parseInt convert text(string) value in number value 

    let value = parseInt(countValue.innerText);
    // update 
    value = value + 1;
    // set value on to UI 
    countValue.innerText = value;
}

const decrement = () =>{
    let value = parseInt(countValue.innerText);
    // update 
    value = value - 1;
    // set value on to UI 
    countValue.innerText = value;
}
 