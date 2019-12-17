
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


class Carousel{

    constructor(element, options={}){
        this.element = element;
        this.options = Object.assign({},{
            slidesToScroll:1,
        slidesVisible:1
        },options);
        let children =[].slice.call(element.children);
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map((child)=>{
            console.log(child);
            
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()
    }

    createDivWithClass(className){
        let div = document.createElement('div')
        div.setAttribute('class',className)
        return div
    }

    setStyle(){
        let ratio = this.items.length / this.options.slidesVisible
        this.container.style.width =  (ratio*100)+"%"
        this.items.forEach(item => item.style.width = ((100/this.options.slidesVisible) /ratio )+"%"
        )
    }

    createNavigation(){
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click',this.next.bind(this))
        prevButton.addEventListener('click',this.prev.bind(this))
    }

    next(){
        this.goToItem(this.currentItem + this.options.slidesToScroll)
    }

    prev(){
        this.goToItem(this.currentItem - this.options.slidesToScroll)

    }

    goToItem(index){
        let translateX = index*(-100 /this.items.length)
        this.container.style.transform = 'translate3d('+translateX +'%,0,0)'
        this.currentItem = index
    }
}


document.addEventListener('DOMContentLoaded',function (){

    new Carousel(document.querySelector('#carousel1'),{
     
        slidesVisible:3
    })
    
})

