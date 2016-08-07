import requestInterval from 'browser-essentials/requestInterval'
import clearRequestInterval from 'browser-essentials/clearRequestInterval'


export default (el) => {
  const images = el.getElementsByTagName('img')

  if (images === null || images.length === 0)
    return new Promise(resolve => resolve())

  let imagesLoaded = 0;
  for (let x = 0; x < images.length; x++) {
    const img = images[x]
    if (img.complete || img.height > 0) {
      imagesLoaded += 1
    } else {
      img.onload = e => imagesLoaded += 1
      img.onerror = e => imagesLoaded += 1
    }
  }

  return new Promise(resolve => {
    const loadingInterval = window.requestInterval(() => {
      if (imagesLoaded === images.length) {
        window.clearRequestInterval(loadingInterval)
        resolve()
      }
    }, 5)
  })
}
