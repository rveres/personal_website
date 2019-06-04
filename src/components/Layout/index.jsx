import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'

import favicon16 from '../../assets/images/favicon16.png'
import favicon32 from '../../assets/images/favicon32.png'
import favicon96 from '../../assets/images/favicon96.png'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Helmet defaultTitle="Robert Veres @thedeveloper733" 
          link={[ { rel: 'icon', type: 'image/png', sizes: "16x16", href: `${favicon16}` },
          { rel: 'icon', type: 'image/png', sizes: "32x32", href: `${favicon32}` },
          { rel: 'shortcut icon', type: 'image/png', href: `${favicon96}` },
        ]} />
        {children}
      </div>
    )
  }
}

export default Layout
