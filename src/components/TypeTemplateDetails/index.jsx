import React from 'react'
import Project from '../Project/'

class TypeTemplateDetails extends React.Component {
  constructor(props) {
    super(props);

    this.toTitleCase = this.toTitleCase.bind(this);
  }

  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

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
            <h1 className="page__title">{this.toTitleCase(type) + ` projects`}</h1>
            <div className="page__body">{items}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default TypeTemplateDetails
