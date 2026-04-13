module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  // Copy our JS and CSS folders so they are available in _site
  eleventyConfig.addPassthroughCopy({
    "src/js": "js",
    "src/css": "css",
    "src/img": "img"
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};
