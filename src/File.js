/**
 * Opens an explorer to select files
 * @param {Object} options
 */
export function OpenFile(options = {}) {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    if (options.multiple) input.setAttribute("multiple", "");
    if (options.accept) input.setAttribute("accept", options.accept);
    input.setAttribute("type", "file");
    input.style.display = "none";
    input.addEventListener("change", ev => {
      if (input.files.length) resolve(input.files);
      else reject(ev);
      input.remove();
    });
    document.body.appendChild(input);
    const event = document.createEvent("MouseEvent");
    event.initMouseEvent(
      "click",
      false,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    input.dispatchEvent(event);
  });
}

/**
 * Reads a HTML5 file as text
 * @param {File} file
 */
export function ReadFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    if (file.type.match(/^text/g)) reader.readAsText(file);
    else reader.readAsDataURL(file);
  });
}
