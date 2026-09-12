/**
 * Markdown-it plugin for image comparer syntax
 * Converts [image1.png|image2.png] to interactive image comparer HTML
 */
export function imageComparerPlugin(md) {
  // Regular expression to match [image1|image2] syntax
  const imageComparerRegex = /^\[([^|\]]+)\|([^|\]]+)\]$/;

  md.block.ruler.before(
    "paragraph",
    "image_comparer",
    function (state, start, end, silent) {
      // Get the line content
      const lineText = state.getLines(start, start + 1, 0, false).trim();

      // Check if the line matches our pattern
      const match = lineText.match(imageComparerRegex);

      if (!match) {
        return false;
      }

      // Don't process if we're in silent mode (just checking if rule matches)
      if (silent) {
        return true;
      }

      const beforeImage = match[1].trim();
      const afterImage = match[2].trim();

      const token = state.push("image_comparer", "div", 1);
      token.beforeImage = beforeImage;
      token.afterImage = afterImage;
      token.markup = lineText;

      state.line = start + 1;
      return true;
    }
  );

  md.renderer.rules.image_comparer = function (tokens, idx) {
    const token = tokens[idx];
    const beforeImage = token.beforeImage;
    const afterImage = token.afterImage;
    const imageId = `image-comparer-${idx}`;

    return `
    <div class="ImageComparer" id="${imageId}">
        <div class="box">
            <div class="controls">
                <a href="#" class="zoom-in" title="toggle zoom"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M0 14.304q0-5.92 4.192-10.112t10.112-4.192 10.176 4.192 4.192 10.112q0 4.512-2.624 8.192l5.952 5.952-3.552 3.552-5.952-5.952q-3.68 2.624-8.192 2.624-5.92 0-10.112-4.192t-4.192-10.176zM4.064 14.304q0 4.256 3.008 7.264t7.232 2.976 7.264-2.976 3.008-7.264-3.008-7.2-7.264-2.976-7.232 2.976-3.008 7.2zM8.192 16.384v-4.064h4.128v-4.128h4.064v4.128h4.128v4.064h-4.128v4.128h-4.064v-4.128h-4.128z"></path></svg></a>
                <a href="#" class="zoom-out" title="toggle zoom"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M0 14.304q0-5.92 4.192-10.112t10.112-4.192 10.176 4.192 4.192 10.112q0 4.512-2.624 8.192l5.952 5.952-3.552 3.552-5.952-5.952q-3.68 2.624-8.192 2.624-5.92 0-10.112-4.192t-4.192-10.176zM4.064 14.304q0 4.256 3.008 7.264t7.232 2.976 7.264-2.976 3.008-7.264-3.008-7.2-7.264-2.976-7.232 2.976-3.008 7.2zM8.192 16.384v-4.064h12.32v4.064h-12.32z"></path></svg></a>
                <a href="#" class="fullscreen" title="toggle fullscreen"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M4.576 20.576H0V32h11.424v-4.576H4.576v-6.848zM0 11.424h4.576V4.576h6.848V0H0v11.424zm27.424 16h-6.848V32H32V20.576h-4.576v6.848zM20.576 0v4.576h6.848v6.848H32V0H20.576z"></path></svg></a>
                <a href="#" class="fullscreen-exit" title="toggle fullscreen"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M0 25.152h6.848V32h4.576V20.576H0v4.576zM6.848 6.848H0v4.576h11.424V0H6.848v6.848zM20.576 32h4.576v-6.848H32v-4.576H20.576V32zm4.576-25.152V0h-4.576v11.424H32V6.848h-6.848z"></path></svg></a>
            </div>
            <div class="slider" style="">
                <button></button>
            </div>
            <div class="beforeDescription">Standard</div>
            <div class="afterDescription">MeshBlend</div>
            <div class="before" style="">
                <img alt="" src="${beforeImage}">
            </div>
            <img class="after" alt="" src="${afterImage}">
        </div>
    </div>
    `;
  };
}
