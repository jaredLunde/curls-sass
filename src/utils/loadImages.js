import CancelablePromise from 'cancelable-promise'


export function loadImage (img) {
  return new CancelablePromise((resolve, reject) => {
    if (img.complete === true || img.naturalHeight > 0) {
      resolve({target: img})
    } else {
      img.onload = resolve
      img.onerror = reject
    }
  })
}


export default function (el) {
  const images = el.getElementsByTagName('img')

  if (images === null || images.length === 0) {
    return new CancelablePromise(resolve => resolve([]))
  }

  const imgs = []
  for (let x = 0; x < images.length; x++) {
    imgs.push(loadImage(images[x]))
  }

  return CancelablePromise.all(imgs)
}
