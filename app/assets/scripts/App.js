//15TH COURSE
import '../styles/styles.css'
//END OF 15TH COURSEb

import 'lazysizes'

import { Markup } from 'interweave';

import MobileMenu from './modules/MobileMenu'

import RevealOnScroll from './modules/RevealOnScroll'

import StickyHeader from './modules/StickyHeader'

//import Modal from './modules/Modal' //commented in course 57

import ClientArea from './modules/ClientArea'

// React Related Code Goes Here
import React from 'react'
import ReactDOM from 'react-dom'

//import React components that we created
import CopyRight from './modules/CopyRight'
import FeatureItem from './modules/React/FeatureItem'


// it is the part you want to render to...
ReactDOM.render(<CopyRight />, document.querySelector("#copy-right")) //render current year

//render feature-item one by one: 
// first one: upper-left:
let featureItems = document.querySelectorAll(".feature-item")
const content_1st_item = `You can search and read our university's events, notifications, take notes and
              interact with our professors. And, if you love animals, you could even check our university's pet system.
               Please <a href="https://mukoedo.com" class="umineko">explore!</a>`
ReactDOM.render(<FeatureItem src="assets/images/icons/university.svg" title="A fictional University" content={content_1st_item}/>, featureItems[0])

// second one: 
const content_2nd_item = `We&rsquo;ve scoured the entire planet for the best retreats and beautiful
vistas. If there&rsquo;s a
corner of
the world you want to escape to we know the most scenic and inspiring locations.`
ReactDOM.render(<FeatureItem src="assets/images/icons/globe.svg" title="Global Guides" content={content_2nd_item}/>, featureItems[1])

new ClientArea()

//new Modal() //course 56 //commented in course 57
//let stickyHeader = //commented in course 57
new StickyHeader()
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75) //made it work on
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)



//let mobileMenu = //commented in course 57 // If your website is pretty complex, then you are recommended to download event-emitter...
new MobileMenu();
let modal // until here, the type for modal is undefined...


document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", e => {
        e.preventDefault()
    
        //the nested comment below will work.
        if (typeof modal == "undefined") {
            import(/* webpackChunkName: "modal" */'./modules/Modal.js').then( x => {
                modal = new x.default() //default: (alias) new Modal(): Modal

                setTimeout(() => modal.openTheModal(), 20) //let the browser wait for 20ms, wait for the browser to create a new object into the DOM.
            }
            ).catch(() => console.log("There was a problem...")) // Once we have imported the Modal, we want to create a new instance of the class.
            //promise: LECTURE 57th
            //It might take thousands of ms to import the file...
            // If everything is well, then the function, then() we provide will get called. However, if there is a problem in the file, never load, such as an error, catch() will be run.
            // then, catch get called.
            //    

        } else {
            // We don;t need to load the modal again.
            modal.openTheModal()

        }

    })
})

//start of lecture 20
if(module.hot) {
    module.hot.accept() // accept hot updates if it makes sense to accept that.
}