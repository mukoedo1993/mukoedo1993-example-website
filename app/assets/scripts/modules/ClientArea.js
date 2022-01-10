import Axios from 'axios'

class ClientArea {
    constructor(){
        this.injectHTML()
        this.form = document.querySelector(".client-area__form")
        //querySelector: Returns the first element that is a descendant of node that matches selectors.

        this.field = document.querySelector(".client-area__radios")

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
        Axios.post('https://stupefied-spence-c25693.netlify.app/.netlify/functions/secret-area', {password: this.form.value}).then(response => {
            // If user provides correct password, we could delete the form from the page, and also insert the secret content into that content
            // area div.
            this.form.remove() // remove(): remove node
            this.contentArea.innerHTML = response.data

        }).catch(
            () => {
                this.contentArea.innerHTML = `<p class="client-area__error"> That secret phrase is not correct. Try again.</p>`

                this.form.value = ''
                this.form.focus()
            })
        // post... a promise: we don't know how long it will take.
        //then(): function if everything is well
        // catch(): function if sth is error...
    }

    injectHTML(){
        document.body.insertAdjacentHTML('beforeend', `
        
<div class="client-area">
<div class="wrapper wrapper--medium">
  <h2 class="section-title section-title--blue">What is the most common sky color in LA?</h2>
  <form class="client-area__form" action="">
  <div>
  <input type="radio" id="blue" name="sky" value="blue"
         checked>
  <label for="blue">Blue</label>
</div>

<div>
  <input type="radio" id="teal" name="sky" value="teal">
  <label for="teal">Teal</label>
</div>

<div>
  <input type="radio" id="scarlet" name="drone" value="scarlet">
  <label for="louie">Scarlet</label>
</div>
    <button class="btn btn--orange">Submit</button>
  </form>
  <div class="client-area__content-area"></div>
</div>
</div>
        `)
    }
}

export default ClientArea