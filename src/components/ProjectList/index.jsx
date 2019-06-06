import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Project from '../Project/'
import Sidebar from '../Sidebar'
import './style.scss'

class ProjectList extends React.Component {
  render() {
    const items = []
    const { title, subtitle } = this.props.data.site.siteMetadata
    const projects = this.props.data.allMarkdownRemark.edges
    projects.forEach(project => {
      items.push(<Project data={project} key={project.node.fields.slug} />)
    })

    return (
      <div>
        <Sidebar {...this.props} />
        <div className="content">
          <div className="content__inner">
            <h1 className="page__title">
              <span className="page__title__text">Projects</span>
            </h1>
            <p className="post__page__title__subtext">Here's what I've been working on lately.</p>
            {items}
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectList

export const pageQuery = graphql`
  query ProjectListQuery {
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
            typeSlug
            elementSlugs
          }
          frontmatter {
            title
            date
            github
            livelink
            type
            description
          }
        }
      }
    }
  }
`
