// utils.js
export function decodeAndCleanHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  const decodedHtml = txt.value;
  return decodedHtml.replace(/(<([^>]+)>)/gi, "");
}
