import Axios from 'axios'

class ClientArea {
    constructor(){
        this.injectHTML()
        this.form = Array.from(document.getElementsByName("sky")).find(r => r.checked).value;
        //querySelector: Returns the first element that is a descendant of node that matches selectors.
        
        this.FormToDelete = document.querySelector("form")
        this.ButtonToDelete = document.querySelector(".js-btn--orange-to-be-deleted")

        this.submitForm = document.querySelector("#form_serverless")

        this.contentArea =document.querySelector(".client-area__after-correct-reveal")

        this.errorArea = document.querySelector(".err")

        this.events()
    }


    events() {
        //listen for HTML form to be submitted
       
        this.submitForm.addEventListener("submit", e=> {
         

            e.preventDefault()// prevent the browser from full reload and refresh
            // Use JS to deal with the form being submitted...

            this.sendRequest()
        })
     
    }

    sendRequest() {// post(target url, password object)
        // because of cross network resource sharing, this network process will not work through.
        this.form = Array.from(document.getElementsByName("sky")).find(r => r.checked).value;
        //console.log(this.form)
        Axios.post('https://stupefied-spence-c25693.netlify.app/.netlify/functions/secret-area', {password: this.form}).then(response => {
            // If user provides correct password, we could delete the form from the page, and also insert the secret content into that content
            //console.log(response.data)
            this.FormToDelete.remove()
            //this.ButtonToDelete.remove()
            this.contentArea.innerHTML = response.data
            // area div.
        }).catch(
            (err) => {
              this.contentArea.innerHTML = `<h1 class="client-area__error">Please choose the <strong>CORRECT</strong> answer.</h1>`
              window.scrollTo(0,document.body.scrollHeight)
              //console.log(err)  
            })
        // post... a promise: we don't know how long it will take.
        //then(): function if everything is well
        // catch(): function if sth is error...
    }

    injectHTML(){
      //Reference: https://stackoverflow.com/a/16515778/17340933
        document.body.insertAdjacentHTML('beforeend', 
`
<div class="client-area" id="quiz">
<div class="wrapper wrapper--medium">
 <h2 class="section-title section-title--blue">What is the most common sky color in LA?</h2>
 <form class="client-area__form" action="" method="POST" id="form_serverless">
  <div class="client-area__form-inner">
   <div class="client-area__input">
    <input type="radio" id="blue" name="sky" value="blue" />
    <label for="blue">Blue</label>
   </div>

   <div class="client-area__input">
    <input type="radio" id="teal" name="sky" value="teal" />
    <label for="teal">Teal</label>
   </div>

   <input type="radio" name="sky" value="default_default_" style="display:none" checked />

   <div class="client-area__input">
    <input type="radio" id="scarlet" name="sky" value="scarlet" />
    <label for="scarlet">Scarlet</label>
   </div>
   <div class="client-area__input">
   <input type="hidden" id="scarlet" name="sky" value="scarlet" />
   <label for="scarlet"></label>
  </div>
  <div class="client-area__input">
  <input value="submit" type="submit" class="btn btn--orange js-btn--orange-submit js-btn--orange-to-be-deleted" />
  </div>
  <div class="client-area__input">
  <input type="hidden" id="scarlet" name="sky" value="scarlet" />
  <label for="scarlet"></label>
 </div>
   </div>
 </form>

 <div class="client-area__content-area client-area__after-correct-reveal"></div>
 <div class="err" style="color: red;"></div>
</div>
</div>
        
        `)
    }
}

export default ClientArea