import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import './style.scss'

class ProjectTemplateDetails extends React.Component {
  render() {
    const { subtitle, author } = this.props.data.site.siteMetadata
    const project = this.props.data.markdownRemark
    const elements = project.fields.elementSlugs

    const homeBlock = (
      <div>
        <Link className="post-single__home-button" to="/projects/">
          All Projects
        </Link>
      </div>
    )

    const elementsBlock = (
      <div className="post-single__tags">
        <ul className="post-single__tags-list">
          {elements &&
            elements.map((element, i) => (
              <li className="post-single__tags-list-item" key={element}>
                <Link to={element} className="post-single__tags-list-item-link">
                  {project.frontmatter.elements[i]}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    )

    return (
      <div>
        {homeBlock}
        <div className="post-single">
          <div className="post-single__inner">
            <h1 className="post-single__title">{project.frontmatter.title}</h1>
            <div
              className="post-single__body"
              /* eslint-disable-next-line react/no-danger */
              dangerouslySetInnerHTML={{ __html: project.html }}
            />
            <div className="post-single__date">
              <em>
                Published {moment(project.frontmatter.date).format('D MMM YYYY')}
              </em>
            </div>
          </div>
          <div className="post-single__footer">
            {elementsBlock}
            <hr />
            <p className="post-single__footer-text">
              {subtitle}
              <a
                href={`https://twitter.com/${author.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <br /> <strong>{author.name}</strong> on Twitter
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectTemplateDetails
