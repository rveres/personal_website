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
    elements.forEach((element, j) => {
      elementsList.push(
        <span className="project__meta-category" key={elementSlugs[j]}>
          <Link to={elementSlugs[j]} className="project__meta-category-link">
            <i className={`devicon-${element}-plain colored`} /><span className="project__meta__elements" />
          </Link>
        </span>
      )
    })

    return (
      <div className="project">
        <div className="project__meta">
          <span className="project__meta-category" key={typeSlug}>
            <Link to={typeSlug} className="project__meta-category-link">
              {type}
            </Link>
          </span>
        </div>
        <h2 className="project__title">
          <Link className="project__title-link" to={slug}>
            {title}
          </Link>
          <span className="project__meta-divider" />
          {elementsList}
        </h2>
        <p className="project__description">{description}</p>
        <Link className="project__readmore" to={slug}>
          Read
        </Link><i className="project__readmore__arrow icon-right-open-mini" />
      </div>
    )
  }
}

export default Project
