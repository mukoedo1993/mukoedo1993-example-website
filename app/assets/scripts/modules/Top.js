import throttle from 'lodash/throttle'
class Top{
    constructor() {
        this.top_back = document.querySelector(".top")
        this.projects_target = document.querySelector("#projects-link")
        this.event()
    }

    event() {
        this.top_back.addEventListener("click", () => this.go_top_back()) 
        //window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200))
        
    }

    go_top_back() {
        console.log("Top.js")
        window.scrollTo(0,0)
    }
/*
    runOnScroll() {
        if(this.projects_target.classList.contains("is-current-link")){
            this.top_back.classList.add("top--darkblue-bg")
        } else {
            this.top_back.classList.remove("top--darkblue-bg")
        }
    }
*/

}
export default Top