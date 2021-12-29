const nrwlConfig = require("@nrwl/react/plugins/webpack.js"); // require the main @nrwl/react/plugins/webpack configuration

module.exports = (config, context) => {
  const isProd = context.configuration === "production";
  const configWithNrwlsSettings = nrwlConfig(config);


  // set fonts to  fonts folder
  configWithNrwlsSettings.module.rules.push({
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: "fonts/[name][ext]",
    },
  })

  // set css files to css folder
  const miniCssExtractPlugin = configWithNrwlsSettings.plugins.find((p) => p.options?.filename?.endsWith("css"));
  if (miniCssExtractPlugin) {
    miniCssExtractPlugin.options.chunkFilename = "css/" + miniCssExtractPlugin.options.chunkFilename;
    miniCssExtractPlugin.options.filename = "css/" + miniCssExtractPlugin.options.filename;
  }

  // set js files to js folder
  const outputChunkFilename = configWithNrwlsSettings.output.chunkFilename
  if(isProd && !outputChunkFilename.startsWith("js/")){
    configWithNrwlsSettings.output.chunkFilename = "js/" + outputChunkFilename
  }

  const outputFileName = configWithNrwlsSettings.output.filename
  if(isProd && !outputFileName.startsWith("js/")){
    configWithNrwlsSettings.output.filename = "js/" + outputFileName
  }


  console.log(configWithNrwlsSettings.module.rules)
  return configWithNrwlsSettings;
};
