import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ResumeTemplateDetails from '../components/ResumeTemplateDetails'

class ResumeTemplate extends React.Component {
  render() {

    return (
      <Layout>
        <div>
          <ResumeTemplateDetails {...this.props} />
        </div>
      </Layout>
    )
  }
}

export default ResumeTemplate