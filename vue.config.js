module.exports = {
  transpileDependencies: ["vuetify"],
  // dev:{
  //   host:'localhost',
  //   port:'8888'
  // },
  devServer: {
    // proxy: {
    //   "/**": {
    //     target: "http://localhost:8080",
    //   },
    // },
    port: 8888,
    disableHostCheck: true,
  },
};
