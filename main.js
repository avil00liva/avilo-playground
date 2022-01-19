import './style.css'
import Split from 'split-grid'
import { encode, decode } from 'js-base64'

const $ = selector => document.querySelector(selector)

window.location.pathname 

const $html = $("#html")
const $js = $("#js")
const $css = $("#css")

$html.addEventListener("input", update)
$js.addEventListener("input", update)
$css.addEventListener("input", update)

function init() {
    const { pathname } = window.location
    const [rawHtml, rawCss, rawJs] = pathname.slice(1).split("%7C") 
    
    const html = decode(rawHtml)
    const css = decode(rawCss)
    const js = decode(rawJs)
    
    $html.value = html
    $css.value = css
    $js.value = js

    const htmlForPreview = createHtml({html, css, js})
    $('iframe').setAttribute("srcdoc", htmlForPreview)
}

function update(){
    const html = $html.value
    const css = $css.value
    const js = $js.value

    const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`

   window.history.replaceState(null, null, `/${hashedCode}`)

    const htmlForPreview = createHtml({html, css, js})
    $('iframe').setAttribute("srcdoc", htmlForPreview)
}

Split({
	columnGutters: [{
    track: 1,
    element: document.querySelector('.vertical-gutter'),
  }],
  rowGutters: [{
  	track: 1,
    element: document.querySelector('.horizontal-gutter'),
  }]
})


const createHtml = ({html, css, js})=> {

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <style>
                ${css}
            </style>
        </head>
        <body>
        ${html}
        <script>
            ${js}     
        </script>
        </body>
        </html>
    `
}

init()