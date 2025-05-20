import {withRouter} from 'react-router-dom'
import {IoMdArrowRoundBack} from 'react-icons/io'

import './index.css'

const BackButton = props => {
  const {history} = props
  const onBack = () => {
    history.goBack()
  }
  return (
    <button type="button" className="back-btn" onClick={onBack}>
      <IoMdArrowRoundBack className="backarrow-icon" />
      Back
    </button>
  )
}

export default withRouter(BackButton)
