const preloadedImages = new Set();

export function preloadImage(src) {
  if (!src || preloadedImages.has(src)) {
    return;
  }

  const image = new Image();
  image.src = src;
  preloadedImages.add(src);
}

export function preloadImages(images = []) {
  images.forEach((src) => preloadImage(src));
}
