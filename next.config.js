// next.config.js
const withTM = require("next-transpile-modules")(["@hi5"]); // pass the modules you would like to see transpiled
const withSass = require("@zeit/next-sass");

module.exports = withTM(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[name]_[local]_[hash:base64:5]"
    },

    sassLoaderOptions: {
      includePaths: ["./styles"]
    }
  })
);
