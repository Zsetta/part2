const Notification = ({message}) => {
    if(message === null){
        return message
    }
    return(
        <div>
         <h2 className="notification">{message}</h2>
        </div>
    )
}
export default Notification