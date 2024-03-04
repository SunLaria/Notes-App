const root = ReactDOM.createRoot(document.getElementById('root'));

function CsrfToken(){
    let cookie = document.cookie.split('csrftoken=')[1]
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={cookie} />
    )
}


function LoginForm() {
    const [message, setMessage] = React.useState(document.getElementById("message").innerText)
    return (
        <div id="login-form-div">
            <form method='post' id="login-form">
                <CsrfToken/>
                <input type="text" placeholder="Username" name="username" />
                <input type="text" placeholder="Password" name="password" />
                <button id="login-button" type="submit">Login</button>
                {message?<div id="message">{message}</div>:""}
            </form>
        </div>
    )
}

function Main() {
    return (
        <>
        <LoginForm />
        </>

    )
}

root.render(<Main/>)