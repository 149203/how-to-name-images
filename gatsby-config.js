module.exports = {
   siteMetadata: {
      siteUrl: "https://www.howtonameimages.com",
      title: "How To Name Images",
   },
   plugins: [
      `gatsby-plugin-preact`,
      {
         resolve: `gatsby-plugin-sass`,
         options: {
            implementation: require("sass"),
            postCssPlugins: [],
            sassOptions: {
               precision: 10,
            },
         },
      },
   ],
};
