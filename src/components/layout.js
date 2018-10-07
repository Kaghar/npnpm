import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'


import './layout.scss'

const Layout = ({ children }) => (
  <div>
    <Helmet
    title= 'Addon releases'
    meta={[
      { name: 'description', content: 'Sample' },
      { name: 'keywords', content: 'sample, something' },
    ]}
    >
    <html lang="en" />
    <body class="bigContainer"></body>
    <script></script>
    </Helmet>
    
    <div className="container">
      {children}
    </div>
  </div>
  
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
