const pug = require("posthtml-pug");
const config = require("./config");
module.exports = {
  input: "src/views/*.pug",
  output: "dist/index.html",
  options: {
    parser: pug({ locals: config }),
  },
  plugins: {
    //htmlnano: {},
  },
};
