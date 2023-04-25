
import "../sass/Modules/Popup.modules.scss"

const Popup = ({onClose}) => {
  return (
  <>
    <div className="Popup-background"></div>
    <div className='Error-Message-Popup'>
        <button className='close-Error-Message' onClick={onClose}>❌</button>
        <p>There seems to be an error with the server at the moment, please try again later and contact us if the issue remains</p>
        <button className="OK-Error-Message-Button" onClick={onClose}>OK</button>
    </div>
    </>
  )
}

export default Popup