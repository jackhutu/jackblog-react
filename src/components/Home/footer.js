import React,{Component} from 'react'

export default class Footer extends Component{
  render(){
    return (
      <footer>
        <div className="footer-container">
          <ul>
            <li>
              <a className="beianhao" href="https://beian.miit.gov.cn/" rel="noopener noreferrer" target="_blank">©2015 / 鄂ICP备15010989号-1</a>
            </li>
            <li>
              <a className="github" href="https://github.com/jackhutu/jackblog-react" rel="noopener noreferrer">
                <i className="fa fa-github"></i>
              </a>
            </li>
            <li>
              <a className="weibo" href="http://weibo.com/hutaigong" rel="noopener noreferrer">
                <i className="fa fa-weibo"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    )
  }
}