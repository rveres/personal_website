import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ProjectTemplateDetails from '../components/ProjectTemplateDetails/index'

class ProjectTemplate extends React.Component {
  render() {
    const { title, subtitle } = this.props.data.site.siteMetadata
    const project = this.props.data.markdownRemark
    const { title: projectTitle, description: projectDescription } = project.frontmatter
    const description = projectDescription !== null ? projectDescription : subtitle

    return (
      <Layout>
        <div>
          <Helmet>
            <title>{`${projectTitle} - ${title}`}</title>
            <meta name="description" content={description} />
          </Helmet>
          <ProjectTemplateDetails {...this.props} />
        </div>
      </Layout>
    )
  }
}

export default ProjectTemplate

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        credits
        author {
          name
          twitter
        }
        disqusShortname
        url
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        elementSlugs
        slug
      }
      frontmatter {
        title
        date
        github
        livelink
        description
        elements
      }
    }
  }
`
