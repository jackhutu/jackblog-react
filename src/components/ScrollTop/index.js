import React,{Component} from 'react'

export default class scrollTop extends Component{
  constructor(props){
    super(props)
    this.state = { isShowTop: false}
    this.gotop = this.gotop.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isShowTop !== this.state.isShowTop
  }
  gotop(e){
    e.preventDefault()
    window.scrollTo(0,0)
    //document.documentElement.scrollTop = document.body.scrollTop =0
  }
  handleScroll(){
    if (window.scrollY > 200) {
      this.setState({ isShowTop: true })
    } else {
      this.setState({ isShowTop: false })
    }
  }
  render(){
    return (
      <div>
      {
        this.state.isShowTop&&
        <div className="gotop" onClick={this.gotop}>
            <i className="fa fa-arrow-up"></i>
        </div>
      }
      </div>
    )
  }
}