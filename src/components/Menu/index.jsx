import React from 'react'
import { Link } from 'gatsby'
import './style.scss'

class Menu extends React.Component {
  render() {
    const menu = this.props.data
    const menuItems = menu.map(item =>
      ((item.type === 1) ? (
        <li className="menu__list-item" key={item.path}>
          <Link
            to={item.path}
            className="menu__list-item-link"
            activeclassname="menu__list-item-link menu__list-item-link--active"
          >
            {item.label}
          </Link>
        </li>
      ) : (
        <li className="menu__list-item" key={item.path}>
          <a
            href={item.path}
            className="menu__list-item-link"
            activeclassname="menu__list-item-link menu__list-item-link--active"
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.label}
          </a>
        </li>
      ))
    )

    const menuBlock = <ul className="menu__list">{menuItems}</ul>

    return <nav className="menu">{menuBlock}</nav>
  }
}

export default Menu
