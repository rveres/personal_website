import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'
import './style.scss'

import Scrollbars from 'react-custom-scrollbars';

import favicon16 from '../../assets/images/favicon16.png'
import favicon32 from '../../assets/images/favicon32.png'
import favicon96 from '../../assets/images/favicon96.png'

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = { height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight });
  }

  render() {
    const { children } = this.props

    return (
      <Scrollbars style={{ height: this.state.height }}>
        <div className="layout">
          <Helmet defaultTitle="Robert Veres"
            link={[{ rel: 'icon', type: 'image/png', sizes: "16x16", href: `${favicon16}` },
            { rel: 'icon', type: 'image/png', sizes: "32x32", href: `${favicon32}` },
            { rel: 'shortcut icon', type: 'image/png', href: `${favicon96}` },
            ]} />
          {children}
        </div>
      </Scrollbars>
    )
  }
}

export default Layout
