import Axios from 'axios'

class ClientArea {
    constructor(){
        this.injectHTML()
        this.form = document.querySelector(".client-area__form")
        //querySelector: Returns the first element that is a descendant of node that matches selectors.

        this.field = document.querySelector(".client-area__input")

        this.contentArea = document.querySelector(".client-area__content-area")

        this.events()
    }


    events() {
        //listen for HTML form to be submitted
        this.form.addEventListener("submit", e=> {
            e.preventDefault()// prevent the browser from full reload and refresh
            // Use JS to deal with the form being submitted...

            this.sendRequest()
        })
    }

    sendRequest() {// post(target url, password object)
        // because of cross network resource sharing, this network process will not work through.
        Axios.post('https://stupefied-spence-c25693.netlify.app/.netlify/functions/secret-area', {password: this.field.value}).then(response => {
            // If user provides correct password, we could delete the form from the page, and also insert the secret content into that content
            // area div.
            this.form.remove() // remove(): remove node
            this.contentArea.innerHTML = response.data

        }).catch(
            () => {
                this.contentArea.innerHTML = `<p class="client-area__error"> That secret phrase is not correct. Try again.</p>`

                this.field.value = ''
                this.field.focus()
            })
        // post... a promise: we don't know how long it will take.
        //then(): function if everything is well
        // catch(): function if sth is error...
    }

    injectHTML(){
        document.body.insertAdjacentHTML('beforeend', `
        
<div class="client-area">
<div class="wrapper wrapper--medium">
  <h2 class="section-title section-title--blue">Secret Client Area</h2>
  <form class="client-area__form" action="">
    <input class="client-area__input" type="text" placeholder="Enter the secret phrase">
    <button class="btn btn--orange">Submit</button>
  </form>
  <div class="client-area__content-area"></div>
</div>
</div>
        `)
    }
}

export default ClientArea