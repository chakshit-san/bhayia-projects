const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-password-display]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~!@#$%^&*()_+=-{[}]:;|<,>.?/';

let password = "";
let  passwordLength = 10;
let checkCount = 0;

//site strength circle color to grey 
setIndicator("#ccc");
handleSlider();

// set password length 
function handleSlider() {
      inputSlider.value = passwordLength;
      lengthDisplay.innerText = passwordLength;
      const min = inputSlider.min;
      const max = inputSlider.max;

                                            // widht in percentage                        height in percentage   of the slider highligher part
                                            
      inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max-min)) + "% 100%";
};


// set indicator 
function setIndicator(color){
    indicator.style.backgroundColor = color;

    //shadow khud se kroo  ----------------------------------HWWWWWWWWWWWWW==============
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
};

// math.random generate btw 0-1
function getRndInteger(min, max){
    // Math.random()*(max-min); => give random no. btw max - min 
    // Math.floor(Math.random()*(max-min));  => round off krta hai floor
  return ( Math.floor((Math.random())*(max-min)) + min );
    // gives random no. btw min se max 

};

function generateRandomNumber(){
    return getRndInteger(0,9);
};

function generateLowerCase(){
   return String.fromCharCode(getRndInteger(97,123));
//    it converts ascii value in to character 
};

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
 //    it converts ascii value in to character 
 };

 function generateSymbols(){
    const randNum = getRndInteger(0, symbols.length);
   return symbols.charAt(randNum);  
 };

 function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(symbolsCheck.checked) hasSym = true;
    if(numbersCheck.checked) hasNum = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setIndicator("#0f0");
    }
     else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >=6){
        setIndicator("#ff0");
     }
     else{
        setIndicator("#f00");
     }
 };


  async function copyContent(){
    
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(e){
        copyMsg.innerText = "failed";
    }
    
    //to make copy wala span visible 
    copyMsg.classList.add("active");
    
    setTimeout( () =>{
        copyMsg.classList.remove("active");
    },2000); 
 };


 function shufflePassword(array){
    //fisher yates method to shuffle password algorithm 
    for(let i =  array.length - 1; i>0; i--){
        const j = Math.floor((Math.random())*(i+1));
        const temp =array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str = "";
    array.forEach((el) => {str = str + el});
    return str;
 };

 function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked){
            checkCount= checkCount+1;
        }
    });

    //special make by own
    if(passwordLength < checkCount){
            passwordLength = checkCount;
            handleSlider();
    }
    
 };

 allCheckBox.forEach( (checkbox) =>{
    checkbox.addEventListener('change',handleCheckBoxChange);
 });

 inputSlider.addEventListener('input', (e) =>{
    passwordLength = e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click',() =>{
    // koi value hai toh copy hojaega nahi toh nahi hoga 
    if(passwordDisplay.value){
        copyContent();
    }
});


generateBtn.addEventListener('click',() =>{
    
    //none of the checkbox are selected
    if(checkCount == 0) 
        return ;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    console.log("starting the journey ");
    // let's start the journey to find new password 
    //remove old password 
    password ="";
    
    // let's put the stuff mentioned by checkboxes 
    // if(uppercaseCheck.checked){
    //     password = password + generateUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //     password = password + generateLowerCase();
    // }

    // if(numbersCheck.checked){
    //     password = password + generateRandomNumber();
    // }

    // if(symbolsCheck.checked){
    //     password = password + generateSymbols();
    // }
     

    // ==> use another way 

    let funcArr = [];
    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbols);

    //complusory addition
    for(let i=0; i<funcArr.length; i++){
        password = password + funcArr[i]();
    }
    
    console.log("Compulsory addition done");
    //remaining addition 
    for(let i=0; i<passwordLength - funcArr.length;i++){
        let randIndex = getRndInteger(0,funcArr.length);
        // console.log("randIndex"+randIndex);
        password = password + funcArr[randIndex]();
    }
    console.log("Remaining addition done");

    //shuffle the password 
    //array ki form mein password ko bejna  
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");

    //show password in ui
    passwordDisplay.value = password;
 
    console.log("UI addition done");

    //strength
    calcStrength();
});