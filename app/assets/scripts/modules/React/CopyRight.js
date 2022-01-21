import React from 'react'

function getYear_helper() {
    return new Date().getFullYear()
}

function CopyRight() {
    return(
        <footer className="site-footer">
        <div className="wrapper">
          <p>
            <span className="site-footer__text">
               &copy;{getYear_helper()} Inspired and highly influenced by <a href="http://schiffwebdesign.com/"> Brad Schiff</a>
            </span>
            <a href="#" className="btn btn__orange open-modal">Get in Touch</a>
          </p>
        </div>
      </footer>
    )
}

export default CopyRight