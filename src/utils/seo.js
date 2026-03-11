export function setPageSEO({ title, description, canonical, ogImage }) {
  // Set document title
  document.title = title ? `${title} | LUXE` : 'LUXE — Premium E-Commerce';

  // Set or create meta tags
  setMeta('description', description || 'Discover premium products at LUXE. Shop electronics, clothing, accessories, home goods & sports gear. Free shipping over $75. 30-day returns.');
  setMeta('og:title', title || 'LUXE — Premium E-Commerce');
  setMeta('og:description', description || 'Discover premium products at LUXE. Shop electronics, clothing, accessories, home goods & sports gear. Free shipping over $75. 30-day returns.');
  setMeta('og:url', canonical || window.location.href);
  if (ogImage) setMeta('og:image', ogImage);

  // Set canonical link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonical || window.location.href);
}

function setMeta(name, content) {
  const attr = name.startsWith('og:') || name.startsWith('twitter:') ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}
