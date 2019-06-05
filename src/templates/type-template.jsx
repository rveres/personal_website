import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import TypeTemplateDetails from '../components/TypeTemplateDetails/'

class TypeTemplate extends React.Component {
  render() {
    const { title } = this.props.data.site.siteMetadata
    const { type } = this.props.pageContext

    return (
      <Layout>
        <div>
          <Helmet title={`${type} - ${title}`} />
          <Sidebar {...this.props} />
          <TypeTemplateDetails {...this.props} />
        </div>
      </Layout>
    )
  }
}

export default TypeTemplate

export const pageQuery = graphql`
  query TypePage($type: String) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        credits
        menu {
          label
          path
        }
        author {
          name
          email
          telegram
          twitter
          github
          rss
          vk
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {
          type: { eq: $type }
          layout: { eq: "project" }
          draft: { ne: true }
        }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            typeSlug
            elementSlugs
          }
          frontmatter {
            title
            date
            type
            elements
            description
          }
        }
      }
    }
  }
`
