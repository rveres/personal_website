import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import ElementTemplateDetails from '../components/ElementTemplateDetails/'

class ElementTemplate extends React.Component {
  render() {
    const { title } = this.props.data.site.siteMetadata
    const { element } = this.props.pageContext

    return (
      <Layout>
        <div>
          <Helmet title={`All Posts using "${element}" - ${title}`} />
          <Sidebar {...this.props} />
          <ElementTemplateDetails {...this.props} />
        </div>
      </Layout>
    )
  }
}

export default ElementTemplate

export const pageQuery = graphql`
  query ElementPage($element: String) {
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
          elements: { in: [$element] }
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
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`
