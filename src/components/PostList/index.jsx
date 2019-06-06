import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Post from '../Post'
import Sidebar from '../Sidebar'
import './style.scss'

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
          <div className="content__inner">
            <h1 className="page__title">
              <span className="page__title__text">Posts</span>
            </h1>
            <p className="post__page__title__subtext">My thoughts on various subjects, as well as updates on what I'm doing.</p>
            {items}
          </div>
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
