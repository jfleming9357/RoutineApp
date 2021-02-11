module.exports = {
  siteMetadata: {
    title: "routine-app",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    `gatsby-plugin-nodejs`,
    {
      // The name of the plugin
      resolve: "gatsby-source-mongodb",
      options: {
        dbName: `gatsby`,
        collection: `routines`,
        connectionString: `mongodb+srv://jfleming9357:F6vnD2a5ZI3kCgdS@cluster0.rwkhx.mongodb.net`,
      },
    },
  ],
};
