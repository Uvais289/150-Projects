let currData= document.getElementById("currDate");
let dateofBirth= document.querySelector("#DOB");
const calAge= document.getElementById("CalcAge");
const displayAge= document.getElementById("age");
var today= new Date();
currDate.innerText=`Today's Data is: ${today.toLocaleDateString('en-US')}`;

calAge.addEventListener("click",()=>{
    var birthDate= new Date(dateofBirth.value);
    var age= today.getFullYear() - birthDate.getFullYear();
    var m= today.getMonth() - birthDate.getMonth();
    if(m< 0 ||(m===0 && today.getDate()<birthDate.getDate())){
        age=age -1;
    }
    displayAge.style.visibility="visible";
    age.innerText=`You are ${age} years old.`
})