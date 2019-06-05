import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import './style.scss'

class Project extends React.Component {
  render() {
    const {
      title,
      date,
      type,
      description,
    } = this.props.data.node.frontmatter
    const { slug, typeSlug } = this.props.data.node.fields

    console.log(type);

    return (
      <div className="post">
        <div className="post__meta">
          <time
            className="post__meta-time"
            dateTime={moment(date).format('MMMM D, YYYY')}
          >
            {moment(date).format('MMMM YYYY')}
          </time>
          <span className="post__meta-divider" />
          <span className="post__meta-category" key={typeSlug}>
            <Link to={typeSlug} className="post__meta-category-link">
              {type}
            </Link>
          </span>
        </div>
        <h2 className="post__title">
          <Link className="post__title-link" to={slug}>
            {title}
          </Link>
        </h2>
        <p className="post__description">{description}</p>
        <Link className="post__readmore" to={slug}>
          Read
        </Link><i className="post__readmore__arrow icon-right-open-mini" />
      </div>
    )
  }
}

export default Project
