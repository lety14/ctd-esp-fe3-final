const path = require("path");

/**
 * TypeScript with type checking
 * https://jestjs.io/docs/code-transformation#typescript-with-type-checking
 */
module.exports = {
  process(sourceText, sourcePath, options) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    };
  },
};
