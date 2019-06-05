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
      elements,
      description,
    } = this.props.data.node.frontmatter
    const { slug, typeSlug, elementSlugs } = this.props.data.node.fields

    const elementsList = []
    elements.forEach((element, i) => {
      elementsList.push(
        <span className="post__meta-category" key={elementSlugs[i]}>
          <Link to={elementSlugs[i]} className="post__meta-category-link">
            {element + ((elementSlugs.length == i+1) ? '' : ', ')}
          </Link>
        </span>
      )
    })

    return (
      <div className="post">
        <div className="post__meta">
          <span className="post__meta-category" key={typeSlug}>
            <Link to={typeSlug} className="post__meta-category-link">
              {type}
            </Link>
          </span>
          <span className="post__meta-divider" />
          {elementsList}
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
