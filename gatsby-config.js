module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `q6vjrgcx3o9h`,
        accessToken: `6763fb24c30d22ed37bd54796d1959ea7d91ab45d97293843f4c6a60ff888dc1`,

      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
  ],
}
