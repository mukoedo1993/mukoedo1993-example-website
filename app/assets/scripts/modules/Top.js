import throttle from 'lodash/throttle'
class Top{
    constructor() {
        this.top_back = document.querySelector(".top")
        this.event()
    }

    event() {
        this.top_back.addEventListener("click", () => this.go_top_back()) 
        window.addEventListener("scroll", throttle(() => this.runOnScroll(), 1000))
        
    }

    go_top_back() {
        //console.log("Top.js")
        window.scrollTo(0,0)
    }

    runOnScroll() {
        if(window.innerWidth < 800){
            this.top_back.innerHTML = ''
            return
        }
        else {
            this.top_back.innerHTML = 'Return to the top'
        if(window.scrollY > 400){
            this.top_back.classList.remove("top__hidden")
        } else {
            this.top_back.classList.add("top__hidden")
        }
      }
    }


}
export default Top