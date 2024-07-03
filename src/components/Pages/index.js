import './index.css'

const Pages = props => {
  const {pageNo, updatedPageNo} = props

  const onClickButton = () => {
    updatedPageNo(pageNo)
  }

  return (
    <li className="page-item">
      <button onClick={onClickButton} type="button" className="page-button">
        {pageNo}
      </button>
    </li>
  )
}

export default Pages
