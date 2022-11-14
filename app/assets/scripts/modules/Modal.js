/*COURSE 56TH*/

class Modal {

        constructor() {
            this.injectHTML()
            this.modal = document.querySelector(".modal")
            this.htmlALL = document.querySelector("html")
            this.closeIcon = document.querySelector(".modal__close")
            //this.openModalButtons = document.querySelectorAll(".open-modal") // commented in course 57. We deal with it in App.js file.
            this.events() //The order matters. Because we need to inject HTML before we inject any javascript
            
        }

    events() {
        // listen for open click
        //this.openModalButtons.forEach(el => el.addEventListener("click", e => this.openTheModal(e)))
        //We deal with the code above in App.js, no longer need the code above here.


        // listen for close click
        this.closeIcon.addEventListener("click", () => this.closeTheModal())
        //X is not a href, so we do not need to prevent its default behavior.


        // pushes any key
        // first, you need to listen to any key-up or key-down event.
        // Once sb. presses the key and releases it up, what to do in response?
        document.addEventListener("keyup", e => this.keyPressHandler(e))

    }

    keyPressHandler(e){
        if(e.keyCode == 27 ) { //27 stands for the numerical value of escape key.
            this.closeTheModal()
        }
    }


    openTheModal(//e
      /*receving incoming paramter*/){
        //e.preventDefault() //e here is the event: clicking.

        this.modal.classList.add("modal--is-visible")
        this.htmlALL.classList.add("body-no-scroll")
    }


    closeTheModal() {
       this.modal.classList.remove("modal--is-visible")
       this.htmlALL.classList.remove("body-no-scroll")
    }


    injectHTML() {
        document.body.insertAdjacentHTML('beforeend',`
        <div class="modal">
        <div class="modal__inner">
          <h2 class="section-title section-title--blue section-title--less-margin"><a href="mailto:zwang2@wvstateu.edu "><img src="assets/images/icons/mail.svg" class="section-title__icon"></a> Get in <strong>Touch</strong></h2>
          <div class="wrapper wrapper--narrow">
            <p class="modal__description">We will have an online order system in place soon. Until then, connect with us on any of the platforms below!</p>
          </div>
    
          <div class="social-icons">
            <a href="https://github.com/mukoedo1993" class="social-icons__icon"><img src="assets/images/icons/github.svg" alt="Github"></a>
            <a href="https://stackexchange.com/users/17707101/z-hwong?tab=accounts" class="social-icons__icon"><img src="assets/images/icons/stack-overflow.svg" alt="Stack-Overflow"></a>
          </div>
        </div>
        <div class="modal__close">X</div> 
      </div>    
        `)//second parameter is the HTML we want to add, or, insert.
    }
}

export default Modal