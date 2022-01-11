import React from 'react'
import { Markup } from 'interweave'

function FeatureItem(props) {
    return (
<div>
<img src={props.src} className="feature-item__icon" />
<h3 class="feature-item__title">{props.title}</h3>
<p class="feature-item__content"><Markup content={props.content} /></p>
</div>)
}

export default FeatureItem