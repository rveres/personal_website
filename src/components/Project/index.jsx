import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import './style.scss'

class Project extends React.Component {
  render() {
    const {
      title,
      date,
      github,
      livelink,
      type,
      elements,
      description,
    } = this.props.data.node.frontmatter
    const { slug, typeSlug, elementSlugs } = this.props.data.node.fields

    const titleLink = ((github !== "") ?
      <a href={github} target="__blank" className="project__title-link">{title}</a>
      :
      <Link className="project__title-link" to={slug}>{title}</Link>
    )

    const learnMoreLink = ((slug !== "none") ?
      <span>
        <Link className="project__readmore" to={slug}>
        Learn more
        </Link>
        <span>
          <i className="project__readmore__arrow icon-right-open-mini" />
          <span className="project__meta-divider" />
        </span>
      </span>
      :
      ""
    )

    const liveLink = ((livelink !== "") ?
    <span>
      <a href={livelink} target="__blank" className="project__readmore">
        View live project
      </a><i className="project__readmore__arrow icon-right-open-mini" />
      <span className="project__meta-divider" />
    </span>
    :
    ""
  )

    const githubLink = ((github !== "") ?
      <span>
        <a href={github} target="__blank" className="project__readmore">
          View on GitHub
        </a><i className="project__readmore__arrow icon-right-open-mini" />
        <span className="project__meta-divider" />
      </span>
      :
      ""
    )

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
          {titleLink}
          {((github !== "") ?  <i className="icon-github-circled" /> : "")}
          <span className="project__meta-divider" />
          {elementsList}
        </h2>
        <p className="project__description">{description}</p>
        {learnMoreLink}{liveLink}{githubLink}
      </div>
    )
  }
}

export default Project
