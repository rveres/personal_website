import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ProjectList from '../components/ProjectList/'

class ProjectListTemplate extends React.Component {
  render() {
    const { title, subtitle } = this.props.data.site.siteMetadata
    const description = subtitle

    return (
      <Layout>
        <div>
          <Helmet>
            <title>{`Projects - ${title}`}</title>
            <meta name="description" content={description} />
          </Helmet>
          <ProjectList {...this.props} />
        </div>
      </Layout>
    )
  }
}

export default ProjectListTemplate

export const pageQuery = graphql`
  query ProjectListTemplateQuery {
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
      filter: { frontmatter: { layout: { eq: "project" }, draft: { ne: true } } }
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
            github
            type
            elements
            description
          }
        }
      }
    }
  }
`
