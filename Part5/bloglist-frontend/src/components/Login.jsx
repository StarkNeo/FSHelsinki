
export const Login = ({handleChangePassword,handleChangeUsername,handleLogin, username, password}) => {
  

  return (
    <form onSubmit={handleLogin}>
      Login to application
      <div>
        Username:
        <input type="text" name="username" id="username" value={username} onChange={handleChangeUsername} />
      </div>
      <div>
        Password: <input type='text' name="password" id='password' value={password} onChange={handleChangePassword}></input>
      </div>
      <button type='submit'>login</button>
    </form>
  )
}