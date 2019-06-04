import React from 'react'
import { Link } from 'gatsby';
import Sidebar from '../Sidebar'
import './style.scss'

import { Document, Page } from 'react-pdf';
import resume from './resume.pdf';

class ResumeTemplateDetails extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }
  
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;
    const { title, subtitle } = this.props.data.site.siteMetadata

    return (
      <div>
        <Sidebar {...this.props} />
        <div className="content">
          <div className="content__inner">
            <div className="page">
              <div
                className="page__body"
                /* eslint-disable-next-line react/no-danger */
              >
                <Document file={resume} onLoadSuccess={this.onDocumentLoadSuccess}>
                  <Page pageNumber={1} />
                  <Page pageNumber={2} />
                </Document>
                <div>
                  <a href="/resume.pdf" target="_blank">Open</a> this résumé as a PDF.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ResumeTemplateDetails

export const pageQuery = graphql`
  query ResumeQuery {
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
