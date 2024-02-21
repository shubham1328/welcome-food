const User = (props) => {
    return(
        <div className="user-card">
            <h2>Name: {props.name}</h2>
            <h3>Location: Pune</h3>
            <h4>Contact: @shubham1303</h4>
        </div>
    )
}
export default User;