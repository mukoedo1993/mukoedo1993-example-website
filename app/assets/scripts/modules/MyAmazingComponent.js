import React from 'react'

function MyAmazingComponent() { //JSS, not HTML
    //Tips:
    //1. class is a keyword reserved in Javascript we need to use the keyword className
    //2. You could only have one root (or top element) at each time.
    return (
        <div>
            <h1 className="section-title section-title--blue">This is My Amazing React Component!!!</h1>
            <p>React is great!!! </p>
        </div>
    )
}

export default MyAmazingComponent