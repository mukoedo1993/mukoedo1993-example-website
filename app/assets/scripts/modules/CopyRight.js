import React from 'react'

function getYear_helper() {
    return new Date().getFullYear()
}

function CopyRight() {
    return(
        <footer class="site-footer">
        <div class="wrapper">
          <p>
            <span class="site-footer__text">
              Copyright &copy; 2021 ~ {getYear_helper()} Clear View Escapes. All rights reserved.
            </span>
            <a href="#" className="btn btn__orange open-modal">Get in Touch</a>
          </p>
        </div>
      </footer>
    )
}

export default CopyRight