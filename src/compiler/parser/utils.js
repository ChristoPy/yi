const modifyLast = (target, path) => {
  const data = {}
	let splittedPath = path.split('.')
  
	for (index in splittedPath) {
	  const currentPath = splittedPath[index]
	  const newPath = splittedPath.slice(index + 1, splittedPath.length).join('.')
  
	  if (!newPath) {
  		target[currentPath] = data
	  } else {
      target[currentPath] = modifyLast(target[currentPath] || data, newPath, data)
	  }
	  break
	}
	return target
}


module.exports = {
  modifyLast
};
