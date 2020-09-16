// Render a template
const $render = (dom, template, data) => import('../template').then(
  (parseTemplate) => dom.innerHTML = parseTemplate(template, data)
)

/**
 * Main component function
 * @param {String} dom The target element
 * @param {Object} data The component's data
 * @param {String} template The component's template
 * @param {Function} created A function called when the component is created
 * @param {Function} mounted A function called when the component is mounted
 * @param {Function} updated A function called when the component is updated
 */
module.exports = ({ dom, data = {}, template = '', created = () => {}, mounted = () => {}, updated = () => {} }) => {
  let $mounted = false
  const $shadow = {
    data,
    dom: document.querySelector(dom)
  }

  created.call($shadow)

  const render = () => {
    $render($shadow.dom, template, $shadow.data)
    if (!$mounted) {
      $mounted = true
      mounted.call($shadow)
    } else {
      updated.call($shadow)
    }
  }

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
