import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import concat from 'lodash/concat'
import ns from 'react-cake/namespace'

import removeDefaultProps from './removeDefaultProps'
import {flexProps, spacingProps} from './props'
import {spacingMods} from './modifiers'
import getModifiers from './getModifiers'
import getFlexModifiers from './getFlexModifiers'
import PageLink from './PageLink'


class Paginate extends React.Component {
  static displayName = 'Paginate'
  static defaultProps = assign({
      page: 1,
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

  getLinkProps (page) {
    return {
      page,
      path: this.props.path,
      onClick: this.props.onPageClick,
      baseUrl: this.props.baseUrl
    }
  }

  get prevButton () {
    const n = parseInt(this.props.page || 1) - 1
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
    const n = parseInt(this.props.page || 1) + 1
    const pages = parseInt(this.props.pages)
    const props = this.getLinkProps(n)

    if (n > pages)
      props.disabled = true

    return (
      <PageLink {...props}>
        {React.createElement('i', {className: 'fa fa-angle-right',
                                   'aria-hidden': 'true'})}
      </PageLink>
    )
  }

  get pageLinks () {
    const n = parseInt(this.props.page || 1)
    const totalPages = parseInt(this.props.pages)
    const maxPages = parseInt(this.props.maxPages)
    const pages = []

    if (this.props.prevButton)
      pages.push(<li>{this.prevButton}</li>)

    const end = n + maxPages
    for (let x = n; x < (end <= totalPages ? end : totalPages + 1); x++) {
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
        <ul>{this.pageLinks}</ul>
        {this.props.children}
      </nav>
    )
  }
}


export default Paginate
