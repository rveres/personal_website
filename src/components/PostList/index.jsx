import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Post from '../Post'
import Sidebar from '../Sidebar'

class PostList extends React.Component {
  render() {
    const items = []
    const { title, subtitle } = this.props.data.site.siteMetadata
    const posts = this.props.data.allMarkdownRemark.edges
    posts.forEach(post => {
      items.push(<Post data={post} key={post.node.fields.slug} />)
    })

    return (
      <div>
        <Sidebar {...this.props} />
        <div className="content">
          <div className="content__inner">{items}</div>
        </div>
      </div>
    )
  }
}

export default PostList

export const pageQuery = graphql`
  query PostListQuery {
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
