import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import concat from 'lodash/concat'
import url from 'browser-essentials/url-extended'
import ns from 'react-cake/namespace'
import {Toggle} from 'react-cake/toggle'
import routeParser from 'react-pilot/routeParser'

import removeDefaultProps from './removeDefaultProps'
import {flexProps, spacingProps} from './props'
import {spacingMods} from './modifiers'
import getModifiers from './getModifiers'
import getFlexModifiers from './getFlexModifiers'


class PageLink extends React.Component {
  static displayName = 'paginate__link'
  static defaultProps = {
    n: 1,
    path: '?page={page}',
    onClick: null,
    baseUrl: null,
    disabled: false,
    active: false
  }

  get resolvedPath () {
    if (this.props.disabled)
      return null

    let path = routeParser.format(this.props.path, {page: this.props.n})
    path = url.parse(path)
    const baseUrl = this.props.baseUrl ? this.props.baseUrl :
                                         url.fromWindow()
    const newQuery = baseUrl.filter(path.query).query
    path = path.filter(newQuery)
    return baseUrl.resolve(path.path).path
  }

  get renderProps () {
    const props = removeDefaultProps(PageLink.defaultProps, this.props)
    delete props.children
    props.className = this.className
    return props
  }

  get className () {
    const modifiers = concat(getModifiers(this.props, spacingMods),
                             getFlexModifiers(this.props))

    if (this.props.className)
      modifiers.push(this.props.className)

    if (this.props.disabled)
      modifiers.push('disabled')

    if (this.props.active)
      modifiers.push('active')

    return ns.classes.append(this, ...modifiers)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render () {
    return (
      <a href={this.resolvedPath}
         className={this.className}
         data-page={this.props.n}
         {...this.renderProps}>
        {this.props.children}
      </a>
    )
  }
}


class Paginate extends React.Component {
  static displayName = 'Paginate'
  static defaultProps = assign({
      n: 1,
      pages:1,
      maxPages: 5,
      path: '?page={page}',
      nextButton: true,
      prevButton: true,
      onPageClick: null,
      baseUrl: null
    },
    spacingProps,
    flexProps
  )

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  getLinkProps (n) {
    return {
      n,
      path: this.props.path,
      onClick: this.props.onPageClick,
      baseUrl: this.props.baseUrl
    }
  }

  get prevButton () {
    const n = parseInt(this.props.n || 1) - 1
    const props = this.getLinkProps(n)

    if (n < 1)
      props.disabled = true

    return (
      <PageLink {...props}>
        {React.createElement('i', {className: 'fa fa-angle-left',
                                   'aria-hidden': 'true'})}
      </PageLink>
    )
  }

  get nextButton () {
    const n = parseInt(this.props.n || 1) + 1
    const props = this.getLinkProps(n)

    if (n > this.props.pages)
      props.disabled = true

    return (
      <PageLink {...props}>
        {React.createElement('i', {className: 'fa fa-angle-right',
                                   'aria-hidden': 'true'})}
      </PageLink>
    )
  }

  get pageLinks () {
    const n = parseInt(this.props.n || 1)
    const pages = []

    if (this.props.prevButton)
      pages.push(<li>{this.prevButton}</li>)

    for (let x = n; x < (n + this.props.maxPages); x++) {
      if (x > this.props.pages)
        break
      const props = this.getLinkProps(x)
      props.active = n === x
      pages.push((
        <li>
          <PageLink {...props}>
            {x}
          </PageLink>
        </li>))
    }

    if (this.props.nextButton)
      pages.push(<li>{this.nextButton}</li>)

    return pages
  }

  get className () {
    const modifiers = concat(getModifiers(this.props, spacingMods),
                             getFlexModifiers(this.props))

    if (this.props.className)
      modifiers.push(this.props.className)

    return ns.classes.append(this, ...modifiers)
  }

  get renderProps () {
    const props = removeDefaultProps(Paginate.defaultProps, this.props)
    delete props.children
    props.className = this.className
    return props
  }

  render () {
    return (
      <nav {...this.renderProps} aria-label="Page navigation">
        <ul>
          {this.pageLinks}
        </ul>
        {this.props.children}
      </nav>
    )
  }
}


export default Paginate
