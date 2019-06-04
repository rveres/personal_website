import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import ResumeTemplateDetails from '../components/ResumeTemplateDetails'

class ResumeTemplate extends React.Component {
  render() {
    const { title, subtitle } = this.props.data.site.siteMetadata
    const description = subtitle

    return (
      <Layout>
        <div>
          <Helmet>
            <title>{`Résumé - ${title}`}</title>
            <meta name="description" content={description} />
          </Helmet>
          <ResumeTemplateDetails {...this.props} />
        </div>
      </Layout>
    )
  }
}

export default ResumeTemplate

export const pageQuery = graphql`
  query ResumeTemplateQuery {
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
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
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
