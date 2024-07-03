import './index.css'

const Pages = props => {
  const {pageNo, updatedPageNo, no} = props

  const onClickButton = () => {
    updatedPageNo(pageNo)
  }

  const activePage = no === pageNo ? 'active-bg' : ''

  return (
    <li className="page-item">
      <button
        onClick={onClickButton}
        type="button"
        className={`page-button ${activePage}`}
      >
        {pageNo}
      </button>
    </li>
  )
}

export default Pages
