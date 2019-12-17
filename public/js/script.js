
// Black Mode

let darkMode = document.querySelectorAll('.blackMode');
let body = document.querySelector('body')

function blackMode(){

    darkMode.forEach(button => {
        button.addEventListener('click',()=>{
            body.style.backgroundColor = getComputedStyle(button).backgroundColor
        })
        
    });

}

blackMode();



