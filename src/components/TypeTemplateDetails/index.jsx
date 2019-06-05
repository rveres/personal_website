import React from 'react'
import Project from '../Project/'

class TypeTemplateDetails extends React.Component {
  render() {
    const items = []
    const { type } = this.props.pageContext
    const projects = this.props.data.allMarkdownRemark.edges
    projects.forEach(project => {
      items.push(<Project data={project} key={project.node.fields.slug} />)
    })

    return (
      <div className="content">
        <div className="content__inner">
          <div className="page">
            <h1 className="page__title">{type}</h1>
            <div className="page__body">{items}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default TypeTemplateDetails
