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
import CopyRight from './modules/React/CopyRight'
import FeatureItem from './modules/React/FeatureItem'

import Top from "./modules/Top"
import { isError } from 'lodash';

import CodeIcon from "./modules/CodeIcon"
/*
* Get the data of stars of repo:
*/
//import githubApi from "./modules/githubApi"
//const githubApiInstance = new githubApi()
//githubApiInstance.init()

const { Octokit } = require("@octokit/core")
const octokit = new Octokit({auth: `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`}) //a read-only token
const repoData = 
await
octokit.request('GET /repos/{owner}/{repo}', {
    owner: 'james-yoo',
    repo: 'DBSCAN'
  })
  
  
  //console.log(repoData)   //For debug only


  /*
  * add a hyperlink to a random page on the codeIcon icon on the top of our code.
  */
  new CodeIcon()

/*
* Render the copyright part.
*/
ReactDOM.render(<CopyRight />, document.querySelector("#copy-right")) //render current year

/*
*
* render feature-item one by one: Here we have four features:
*/
const icon_dir = "assets/images/icons/"

// first one: upper-left:
let featureItems = document.querySelectorAll(".feature-item")
const content_of_1st_feature_item = `You can search and read our university's events, notifications, take notes and
              interact with our professors. And, if you love animals, you could even check our university's pet system.
               Please <a href="https://mukoedo.com" class="higurashi">explore!</a>`
const title_of_1st_feature_item = "A fictional university"
const src_of_1st_feature_item = icon_dir + "university.png"
ReactDOM.render(<FeatureItem src={src_of_1st_feature_item} title={title_of_1st_feature_item} content={content_of_1st_feature_item}/>, featureItems[0])

// second one: lower-left:
const content_2nd_item = `It is a cool website you are viewing now based on the <a href="https://en.wikipedia.org/wiki/Responsive_web_design" class="higurashi">concept of responsive design</a>. Not only that, I but also applied React for the copyright part, not to mention the serverless netlify function for the interesting <a href="#quiz" class="higurashi">quiz</a>.`
const title_of_2nd_feature_item = "This Website"
const src_of_2nd_feature_item = icon_dir + "earth.png"
ReactDOM.render(<FeatureItem src={src_of_2nd_feature_item} title={title_of_2nd_feature_item} content={content_2nd_item}/>, featureItems[1])

// third one: lower-left:
const content_3rd_item =
`I also have contributed to a popular <a href="https://en.wikipedia.org/wiki/DBSCAN" class="higurashi">DBSCAN </a>library in <a href="https://github.com/james-yoo/DBSCAN" class="higurashi">github</a>, which has ${repoData.data.stargazers_count} star${repoData.data.stargazers_count ==1? '':'s'} and ${repoData.data.forks_count} fork${repoData.data.forks_count == 1?'':'s'}. I also developed a basic program to fetch stocks' data and a model to predict it with my teammate.` 
const title_of_3rd_feature_item = "Machine Learning"
const src_of_3rd_feature_item = icon_dir + "robot(3).png"
ReactDOM.render(<FeatureItem src={src_of_3rd_feature_item} title={title_of_3rd_feature_item} content={content_3rd_item}/>, featureItems[2])

// fourth one: lower-right: 
// third one: lower-left:
const content_4th_item = 
`I developed a simple app for social network, named <a href="http://shaberu.herokuapp.com/" class="higurashi">shaberu(しゃべる)</a>, which roughly means talking in Japanese. You could not only post and search, but also chat with other people here.`
const title_of_4th_feature_item = "Shaberu"
const src_of_4th_feature_item = icon_dir + "talking-square.png"
ReactDOM.render(<FeatureItem src={src_of_4th_feature_item} title={title_of_4th_feature_item} content={content_4th_item}/>, featureItems[3])

new ClientArea()

//new Modal() //course 56 //commented in course 57
//let stickyHeader = //commented in course 57
new StickyHeader()
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75) //made it work on
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)
new RevealOnScroll(document.querySelectorAll(".picture--uppermost-2nd"), .10);
new Top()

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

                setTimeout(() => modal.openTheModal(), 20) //let the browser wait for 20ms, wait for the browser to create a new object and inject new HTML into the DOM.
            }
            ).catch((err) => console.log(err)) // Once we have imported the Modal, we want to create a new instance of the class.
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