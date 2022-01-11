import React from 'react'

function getYear_helper() {
    return new Date().getFullYear()
}

function CopyRight() {
    return(
        <footer className="site-footer">
        <div class="wrapper">
          <p>
            <span className="site-footer__text">
              Copyright &copy; 2021 ~ {getYear_helper()} Tom Kimi, an ambituous programmer. All rights reserved.
            </span>
            <a href="#" className="btn btn__orange open-modal">Get in Touch</a>
          </p>
        </div>
      </footer>
    )
}

export default CopyRight