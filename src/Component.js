import PureComponent from './PureComponent'


export default class Component extends PureComponent {
  shouldComponentUpdate () {
    return true
  }
}
