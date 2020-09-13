// Render a template
const $render = ({ dom, template, data }) => {
  import('../template').then((parseTemplate) => dom.innerHTML = parseTemplate(template, data))
}

/**
 * Main component function
 * @param {String} dom The target element
 * @param {Object} data The component's data
 * @param {String} template The component's template
 */
module.exports = ({ dom, data = {}, template = '' }) => {
  const $shadow = {
    data,
    template,
    dom: document.querySelector(dom)
  }

  const render = () => $render($shadow)

  if (data) {
    import('../bind').then((bind) => {
      $shadow.data = bind(data, render)
      render()
    })
  } else {
    render()
  }

  return $shadow
}
