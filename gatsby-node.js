const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const slash = require('slash')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/post-template.jsx')
    const pageTemplate = path.resolve('./src/templates/page-template.jsx')
    const tagTemplate = path.resolve('./src/templates/tag-template.jsx')
    const postListTemplate = path.resolve('./src/templates/post-list-template.jsx')
    const categoryTemplate = path.resolve(
      './src/templates/category-template.jsx'
    )
    const resumeTemplate = path.resolve('./src/templates/resume-template.jsx')
    const projectTemplate = path.resolve('./src/templates/project-template.jsx')
    const projectListTemplate = path.resolve('./src/templates/project-list-template.jsx')
    const elementTemplate = path.resolve('./src/templates/element-template.jsx')
    const typeTemplate = path.resolve('./src/templates/type-template.jsx')

    graphql(`
      {
        allMarkdownRemark(
          limit: 1000
          filter: { frontmatter: { draft: { ne: true } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
                layout
                category
                elements
                type
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      _.each(result.data.allMarkdownRemark.edges, edge => {
        if (_.get(edge, 'node.frontmatter.layout') === 'page') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(pageTemplate),
            context: { slug: edge.node.fields.slug },
          })
        } else if (_.get(edge, 'node.frontmatter.layout') === 'list') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(postListTemplate),
            context: { slug: edge.node.fields.slug },
          })
        } else if (_.get(edge, 'node.frontmatter.layout') === 'projects') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(projectListTemplate),
            context: { slug: edge.node.fields.slug },
          })
        } else if (_.get(edge, 'node.frontmatter.layout') === 'resume') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(resumeTemplate),
            context: { slug: edge.node.fields.slug },
          })
        } else if (_.get(edge, 'node.frontmatter.layout') === 'post') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(postTemplate),
            context: { slug: edge.node.fields.slug },
          })

          let tags = []
          if (_.get(edge, 'node.frontmatter.tags')) {
            tags = tags.concat(edge.node.frontmatter.tags)
          }

          tags = _.uniq(tags)
          _.each(tags, tag => {
            const tagPath = `/tags/${_.kebabCase(tag)}/`
            createPage({
              path: tagPath,
              component: tagTemplate,
              context: { tag },
            })
          })

          let categories = []
          if (_.get(edge, 'node.frontmatter.category')) {
            categories = categories.concat(edge.node.frontmatter.category)
          }

          categories = _.uniq(categories)
          _.each(categories, category => {
            const categoryPath = `/categories/${_.kebabCase(category)}/`
            createPage({
              path: categoryPath,
              component: categoryTemplate,
              context: { category },
            })
          })
        } else if (_.get(edge, 'node.frontmatter.layout') === 'project') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(projectTemplate),
            context: { slug: edge.node.fields.slug },
          })

          let elements = []
          if (_.get(edge, 'node.frontmatter.elements')) {
            elements = elements.concat(edge.node.frontmatter.elements)
          }

          elements = _.uniq(elements)
          _.each(elements, element => {
            const elementPath = `/elements/${_.kebabCase(element)}/`
            createPage({
              path: elementPath,
              component: elementTemplate,
              context: { element },
            })
          })

          let types = []
          if (_.get(edge, 'node.frontmatter.type')) {
            types = types.concat(edge.node.frontmatter.type)
          }

          types = _.uniq(types)
          _.each(types, type => {
            const typePath = `/types/${_.kebabCase(type)}/`
            createPage({
              path: typePath,
              component: typeTemplate,
              context: { type },
            })
          })
        } 

      })

      resolve()
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath)
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`
    createNodeField({ node, name: 'slug', value: slug })
  } else if (
    node.internal.type === 'MarkdownRemark' &&
    typeof node.slug === 'undefined'
  ) {
    const fileNode = getNode(node.parent)
    let slug = fileNode.fields.slug
    if (typeof node.frontmatter.path !== 'undefined') {
      slug = node.frontmatter.path
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => `/tags/${_.kebabCase(tag)}/`
      )
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs })
    }

    if (typeof node.frontmatter.category !== 'undefined') {
      const categorySlug = `/categories/${_.kebabCase(
        node.frontmatter.category
      )}/`
      createNodeField({ node, name: 'categorySlug', value: categorySlug })
    }
  
    if (node.frontmatter.elements) {
      const elementSlugs = node.frontmatter.elements.map(
        element => `/elements/${_.kebabCase(element)}/`
      )
      createNodeField({ node, name: 'elementSlugs', value: elementSlugs })
    }

    if (typeof node.frontmatter.type !== 'undefined') {
      const typeSlug = `/types/${_.kebabCase(
        node.frontmatter.type
      )}/`
      createNodeField({ node, name: 'typeSlug', value: typeSlug })
    }
  
  }
}
