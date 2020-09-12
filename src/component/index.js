// Render a template
const $render = ({ $dom, $template, $data }) => {
  import('../template').then((parseTemplate) => $dom.innerHTML = parseTemplate($template, $data))
}

/**
 * Main component function
 * @param {String} The target element
 * @param {Object} The component's data
 * @param {String} The component's template
 */
module.exports = ({ dom, data, template }) => {
  let $data = {}
  const $template = template || ''
  const $dom = document.querySelector(dom)

  // If the component has data, bind it before in order to add reactivity
  if (data) {
    import('../bind').then((bind) => {
      $data = bind(data, $render)
      $render({ $dom, $template, $data })
    })
  } else if (template) {
    $render({ $dom, $template, $data })
  }
}
