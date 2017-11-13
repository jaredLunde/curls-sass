import React from 'react'
import {Counter, namespace as ns, cloneIfElement, compose} from 'react-cake'
import Type from '../Type'
import propTypes from './propTypes'
import {createUINode, joinClassName} from '../utils'


/**
<Paginate
  numPages={3000}
  initialPage={1}
  numDisplayed={5}
  path='/page/{page}'
>
  {
    ({pageNum, path, next, prev, jumpTo}) => (
      <input
        value={pageNum}
        onChange={e => jumpTo(parseInt(e.target.value) || 1)}
        type='number'
        min={1}
        max={3000}
      />
    )
  }
</Paginate>
*/
export const PageNum = ({
  pageNum,
  isCurrent,
  isNext,
  isPrev,
  path
}) => (
  <a
    className={
      joinClassName(
        'paginate__page',
        isCurrent ? 'paginate--current' : ''
      )
    }
    href={path}
    key={path}
  >
    {pageNum}
  </a>
)

export const NextPage = ({pageNum, path, isDisabled}) => (
  <a
    className={
      joinClassName(
        'paginate__next',
        isDisabled ? 'paginate--disabled' : ''
      )
    }
    href={isDisabled ? void 0 : path}
    key='pageinate__next'
  >
    <Type xxs>
      ▶
    </Type>
  </a>
)

export const PrevPage = ({pageNum, path, isDisabled}) => (
  <a
    className={
      joinClassName(
        'paginate__prev',
        isDisabled ? 'paginate--disabled' : ''
      )
    }
    href={isDisabled ? void 0 : path}
    key='pageinate__prev'
  >
    <Type xxs>
      ◀
    </Type>
  </a>
)

export const formatPath = (path, pageNum) => path.replace(
  /\{page\}/g,
  pageNum
)

const getPage = ({currentPage, pageNum, path}) => ({
  pageNum,
  isCurrent: currentPage === pageNum,
  isNext: currentPage === (pageNum + 1),
  isPrev: currentPage === (pageNum - 1),
  path: formatPath(path, pageNum)
})

const getPages = ({
  pageButton,
  numPages,
  currentPage,
  numDisplayed,
  path
}) => {
  let pages = []
  currentPage = parseInt(currentPage)

  if (numDisplayed === 0) {
    return pages
  } else if (
    numDisplayed === void 0 ||
    numDisplayed === null ||
    numDisplayed === -1
  ) {
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      pages.push(pageButton(getPage({pageNum, currentPage, path})))
    }

    return pages
  } else {
    numDisplayed -= 1
    let lowerHalf = Math.floor(numDisplayed / 2)
    let upperHalf = Math.ceil(numDisplayed / 2)
    let lowerBound = currentPage - lowerHalf

    if (currentPage === 1) {
      upperHalf += lowerHalf
      lowerBound = currentPage
    } else if (lowerBound < 1) {
      upperHalf += Math.abs(1 - lowerBound)
      lowerBound = 1
    }

    let upperBound = currentPage + upperHalf

    if (currentPage === numPages) {
      lowerBound -= upperHalf
      upperBound = numPages
    } else if (upperBound > numPages) {
      lowerBound -= Math.abs(numPages - upperBound)
      upperBound = numPages
    }

    lowerBound = lowerBound < 1 ? 1 : lowerBound

    for (let pageNum = lowerBound; pageNum < currentPage; pageNum++) {
      pages.push(pageButton(getPage({pageNum, currentPage, path})))
    }

    for (let pageNum = currentPage; pageNum <= upperBound; pageNum++) {
      pages.push(pageButton(getPage({pageNum, currentPage, path})))
    }

    return pages
  }
}


export const Paginate = createUINode('Paginate', propTypes)
Paginate.defaultProps = {
  nodeType: 'nav',
  path: '?page={page}',
  numDisplayed: 5,
  nextButton: NextPage,
  prevButton: PrevPage,
  pageButton: PageNum
}

Paginate.prototype.render = function () {
  const {
    nodeType,
    className,
    path,
    currentPage,
    incr,
    decr,
    setValue,
    nextButton,
    prevButton,
    children,
    numPages,
    setStep,
    numDisplayed,
    pageButton,
    ...props
  } = this.props

  let paginateChildren = []

  if (prevButton) {
    const pageNum = currentPage - 1

    paginateChildren.push(
      prevButton({
        pageNum,
        path: formatPath(path, pageNum),
        isDisabled: pageNum < 1
      })
    )
  }

  paginateChildren = paginateChildren.concat(getPages(this.props))

  if (nextButton) {
    const pageNum = currentPage + 1

    paginateChildren.push(
      nextButton({
        pageNum,
        path: formatPath(path, pageNum),
        isDisabled: pageNum > numPages
      })
    )
  }

  if (children) {
    paginateChildren.push(
      cloneIfElement(
        children,
        {
          path,
          pageNum: currentPage,
          next: incr,
          prev: decr,
          jumpTo: setValue
        }
      )
    )
  }

  return (
    React.createElement(
      nodeType,
      {
        ...props,
        className: joinClassName(className || '', ns.classes.get(this))
      },
      paginateChildren
    )
  )
}


const composedPaginate = compose([Counter, Paginate])

export default ({
  initialPage,
  numPages,
  onChange,
  onBoundMinPage,
  onBoundMaxPage,
  ...props
}) => composedPaginate({
  propName: 'currentPage',
  initialValue: initialPage || 1,
  minValue: 0,
  maxValue: numPages,
  onChange: onChange,
  onBoundMin: onBoundMinPage,
  onBoundMax: onBoundMaxPage,
  numPages: numPages,
  ...props,
})
