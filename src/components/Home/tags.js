import React,{Component,PropTypes} from 'react'
import tiny from '../../assets/images/tiny.gif'

//列表View
export default class Tags extends Component{
  static propTypes = {
    tagList: PropTypes.array.isRequired,
    options: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    changeSort: PropTypes.func.isRequired
  }

  render(){
    const {options,changeSort,isFetching,tagList} = this.props
    return (
      <ul className="sort-tags list-unstyled clearfix">
        <li>
          <a className={(options.sortName == 'publish_time')&&'active'} onClick={ e => changeSort(e,{'currentPage':1,'sortName':'publish_time','tagId':''})} href="javascript:;">最新</a>
        </li>
        <li>
          <a className={(options.sortName == 'visit_count')&&'active'} onClick={ e => changeSort(e,{'currentPage':1,'sortName':'visit_count','tagId':''})} href="javascript:;">热门</a>
        </li>
        {
          tagList.map((tag,i)=>
            <li key={i}>
            <a className={(options.tagId == tag._id)&&'active'} onClick={ e => changeSort(e,{'currentPage':1,'sortName':'','tagId':tag._id})} href="javascript:;">{tag.name}</a>
            </li>
          )
        }
        {isFetching&&
          <li>
            <img className="loader-tiny" src={tiny} />
          </li>
        }
      </ul>
    )
  }
}