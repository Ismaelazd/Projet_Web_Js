// Black Mode

let darkMode = document.querySelectorAll('.blackMode');
let body = document.querySelector('body')
let nav = document.querySelector('.navbar')

function blackMode() {

  darkMode.forEach(button => {
    button.addEventListener('click', () => {
      body.style.backgroundColor = getComputedStyle(button).backgroundColor
      nav.style.backgroundColor = 'white'
    })

  });

}

blackMode();



/*********************
 Btn connexion
*/

let modal = document.getElementById("myModal");
let btn_connexion = document.getElementById("btnConnex");
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn_connexion.onclick = function () {
  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/*********************
 Btn connectez vous
*/

let modal2 = document.getElementById("myModal2");
let btn_connectez_vous = document.querySelectorAll(".myBtn2");
let span2 = document.getElementsByClassName("close2")[0];

// When the user clicks on the button, open the modal
console.log(btn_connectez_vous);

btn_connectez_vous.forEach(btn => {
  btn.onclick = function () {
    modal2.style.display = "block";
    modal.style.display = "none"
    modal3.style.display = "none"
  }
})


// When the user clicks on <span> (x), close the modal

span2.onclick = function () {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}
// bouton pour se connecter apres avoir inscrit son mail et mdp
let btn_se_connecter = document.getElementsByClassName("btn_se_connecter")[0];

btn_se_connecter.onclick = function () {
  modal2.style.display = "none";
}

/*********************
 Btn inscrivez vous
*/

let modal3 = document.getElementById("myModal3");
let btn_inscrivez_vous = document.querySelectorAll(".myBtn3");
let span3 = document.getElementsByClassName("close3")[0];

// When the user clicks on the button, open the modal
btn_inscrivez_vous.forEach(btn =>
  btn.onclick = function () {
    modal3.style.display = "block";
    modal.style.display = "none"
    modal2.style.display = "none"

  }
)

// When the user clicks on <span> (x), close the modal
span3.onclick = function () {
  modal3.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal2) {
    modal3.style.display = "none";
  }
}
// bouton pour se connecter apres avoir inscrit son mail et mdp
let btn_s_inscrire = document.getElementsByClassName("btn_s_inscrire")[0];
btn_s_inscrire.onclick = function () {
  modal3.style.display = "none";
}

// Carousel

class Carousel {

  constructor(element, options = {}) {
    this.element = element;
    this.options = Object.assign({}, {
      slidesToScroll: 1,
      slidesVisible: 1,
      navigation: true,
      pagination: false,
      loop: false,
      infinite: false
    }, options);
    let children = [].slice.call(element.children);
    this.isMobile = false
    this.currentItem = 0

    // modification du DOM
    this.root = this.createDivWithClass('carousel')
    this.container = this.createDivWithClass('carousel__container')
    //this.root.setAttribute('tabindex', '0')
    this.root.appendChild(this.container)
    this.element.appendChild(this.root)
    this.moveCallbacks = []
    this.items = children.map((child) => {
      console.log(child);

      let item = this.createDivWithClass('carousel__item')
      item.appendChild(child)

      return item
    })
    this.setStyle()
    this.createNavigation()

    if (this.options.infinite) {
      let offset = this.options.slidesVisible * 2 - 1
      this.items = [
        ...this.items.slice(this.items.length - offset).map(elem => elem.cloneNode(true)),
        ...this.items,
        ...this.items.slice(0, offset).map(elem => elem.cloneNode(true)),
      ]
      this.currentItem = offset
      console.log(this.items);

    }
    this.items.forEach(item => this.container.appendChild(item))
    this.setStyle()

    if (this.options.navigation) {
      this.createNavigation()
    }

    if (this.options.pagination) {
      this.createPagination()
    }

    // Evenements
    this.moveCallbacks.forEach(cb => cb(0))
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize.bind(this))
    this.root.addEventListener('keyup', e => {
      if (e.key === ' ArrowRight') {
        this.next()
      } else if (e.key === ' ArrowLeft') {
        this.prev()
      }
    })
  }

  createDivWithClass(className) {
    let div = document.createElement('div')
    div.setAttribute('class', className)
    return div
  }

  setStyle() {
    let ratio = this.items.length / this.slidesVisible
    this.container.style.width = (ratio * 100) + "%"
    this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%")
  }

  createNavigation() {
    let nextButton = this.createDivWithClass('carousel__next')
    let prevButton = this.createDivWithClass('carousel__prev')
    this.root.appendChild(nextButton)
    this.root.appendChild(prevButton)
    nextButton.addEventListener('click', this.next.bind(this))
    prevButton.addEventListener('click', this.prev.bind(this))
    if (this.options.loop === false) {
      this.onMove(index => {
        if (index === 0) {
          prevButton.classList.add('carousel__prev--hidden')
          // prevButton.classList.remove('carousel__prev')
        } else {
          //prevButton.classList.add('carousel__prev')
          prevButton.classList.remove('carousel__prev--hidden')

        }

        if (this.items[this.currentItem + this.slidesVisible] === undefined) {
          nextButton.classList.add('carousel__next--hidden')
          //nextButton.classList.remove('carousel__next')

        } else {
          //nextButton.classList.add('carousel__next')
          nextButton.classList.remove('carousel__next--hidden')
        }
      })
    }

  }

  next() {
    this.goToItem(this.currentItem + this.slidesToScroll)
  }

  prev() {
    this.goToItem(this.currentItem - this.slidesToScroll)

  }

  goToItem(index) {
    if (index < 0) {
      if (this.options.loop) {
        index = this.items.length - this.slidesVisible

      } else {
        return
      }

    } else if (index >= this.items.length || (this.items[this.currentItem + this.options.slidesVisible] === undefined && index > this.currentItem)) {
      if (this.options.loop) {
        index = this.items.length - this.slidesVisible

      } else {
        index = 0
      }
    }
    let translateX = index * (-100 / this.items.length)
    this.container.style.transform = 'translate3d(' + translateX + '%,0,0)'
    this.currentItem = index
    this.moveCallbacks.forEach(cb => cb(index))
  }

  onMove(cb) {
    this.moveCallbacks.push(cb)

  }

  onWindowResize() {
    let mobile = window.innerWidth < 800
    if (mobile !== this.isMobile) {
      this.isMobile = mobile
      this.setStyle()
      this.moveCallbacks.forEach(cb => cb(this.currentItem));

    }
  }

  createPagination() {
    let pagination = this.createDivWithClass('carousel__pagination')
    let buttons = []
    this.root.appendChild(pagination)
    for (let i = 0; i < this.items.length; i = i + this.options.slidesToScroll) {

      let button = this.createDivWithClass('carousel__pagination__button')
      button.addEventListener('click', () => this.goToItem(i))
      pagination.appendChild(button)
      buttons.push(button)
    }
    this.onMove(index => {
      let activeBtn = buttons[Math.floor(index / this.options.slidesToScroll)]
      if (activeBtn) {
        buttons.forEach(btn => btn.classList.remove('carousel__pagination__button--active'))
        activeBtn.classList.add('active')
      }
    })
  }

  get slidesToScroll() {
    return this.isMobile ? 1 : this.options.slidesToScroll
  }

  get slidesVisible() {
    return this.isMobile ? 1 : this.options.slidesVisible
  }

}

let onReady = function () {
  new Carousel(document.querySelector('#carousel1'), {
    slidesVisible: 4,
    slidesToScroll: 1,
    loop: false,
    pagination: true,
    infinite: true
  })
}

if (document.readyState !== 'loading') {
  onReady()
}
document.addEventListener('DOMContentLoaded', onReady)