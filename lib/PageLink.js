import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import url from 'browser-essentials/url-extended'
import * as ns from 'react-cake/namespace'
import routeParser from 'react-pilot/routeParser'

import removeDefaultProps from './removeDefaultProps'
import {flexProps, spacingProps} from './props'
import {spacingMods} from './modifiers'
import Component from './Component'


export default class PageLink extends Component {
  static displayName = 'paginate__link'
  static modifiers = [spacingMods]
  static flexName = null
  static defaultProps = {
    page: 1,
    path: '?page={page}',
    onClick: null,
    baseUrl: null,
    disabled: false,
    active: false
  }

  get resolvedPath () {
    if (this.props.disabled)
      return null

    let path = routeParser.format(this.props.path, {page: this.props.page})
    path = url.parse(path)

    const baseUrl = this.props.baseUrl ? this.props.baseUrl :
                                         url.fromWindow()
    const newQuery = url.parse(baseUrl.format()).filter(path.query).query
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
    const modifiers = this.getModifiers()

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
         data-page={this.props.page}
         {...this.renderProps}>
        {this.props.children}
      </a>
    )
  }
}
