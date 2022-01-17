//cloud function:
// We created this JS function.

//Netlify takes the functions we have written, and sends it to 
//a private and trusted environment over on Amazon web services.
//Since then, Netlify sets up a convenient URL.
// Whenever someone sends a request to the URL, netlify tells amazon servers to run
// and execute that.
// 3rd parties, including malicious users, will never the code we type here.
// The public will only see the response we respond to.


// cloud function?
//Not executed on web browser, static file host or a server.
// to test the data a user sent to a URL...
// different results ->different responses

//COURSE 66TH AND 67TH!!!!!!!!!!!!!!!!!!!!
//postman needed

exports.handler = (event, context, callback) => {
    const headers = {   //headers here is important to detour the CORS for local debugging
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers" : "Content-Type"
      }

      if (event.httpMethod !== "POST") {
        return callback(null, {
          statusCode: 200,
          headers,
          body: "This was not a POST request"
        })
      }
      

    const secretContent =
    `<h3 class="client-area__content_area_h3">Welcome To The Secret Area</h3>
    <p class="client-area__content_area_p"> You are right. LA is a city that is usually <strong>SUNNY!</strong> </p>
    ` 
    let body

    // event.body is the content
    if (event.body) {
        body = JSON.parse(event.body)
    } else {
        body = {}
    }

    if (body.password == "blue") {
        callback(null, {
            statusCode: 200 , //200: success 404:not found
            headers,
            body: secretContent
        })
    }
    else {
        callback(null, {
            statusCode: 401 , //401: unauthorized
            headers
        })
    }




}