import '../index.css';

const Notification=({message})=>{
    if(message === null){
        return null
    }
    return(
        <div>
            App Messages:
            <p className="message">{message}</p>
        </div>
    )
}

export default Notification