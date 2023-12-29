const ErrNotification = ({errMsg}) => {
    if(errMsg === null){
        return errMsg
    }
    return(
        <div>
          <h1 className="error">{errMsg}</h1>
        </div>
    )
}
export default ErrNotification