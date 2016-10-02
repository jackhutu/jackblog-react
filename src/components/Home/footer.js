import React,{Component} from 'react'

export default class Footer extends Component{
  render(){
    return (
      <footer>
      <div className="footer-container">
        <ul>
          <li>
            <span>©2015 / 鄂ICP备15010989号-1</span>
          </li>
          <li>
            <a className="github" href="https://github.com/jackhutu/jackblog-react" target="_blank">
              <i className="fa fa-github"></i>
            </a>
          </li>
          <li>
            <a className="weibo" href="http://weibo.com/hutaigong" target="_blank">
              <i className="fa fa-weibo"></i>
            </a>
          </li>
        </ul>
      </div>
      </footer>
    )
  }
}