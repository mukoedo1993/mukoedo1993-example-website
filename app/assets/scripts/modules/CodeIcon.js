class CodeIcon{
    constructor(){
const axios = require( 'axios' )
 
axios.get('https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions|images&rvprop=content&grnlimit=1&origin=*' 
           ).then(res =>{
               let code_icon = document.querySelector(".code-icon")
               
                //console.log(res.data.query.pages)
                let temp_arr = res.data.query.pages
                let temp_number
                let temp_title
                //console.log(temp_arr)
                Object.keys(temp_arr).forEach(prop => {
                   temp_number = prop
                   //console.log(temp_number)
                   temp_title = temp_arr[temp_number].title
                   //console.log(temp_arr[temp_number].title)
                   })
                code_icon.setAttribute("href", `http://en.wikipedia.org/wiki?curid=${temp_number}`)
                code_icon.setAttribute("title",`Suprise. My code lead you to a random wiki page: ${temp_title}`)
           }).catch(e => console.log(e)) 
        }
}
export default CodeIcon