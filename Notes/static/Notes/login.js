const root = ReactDOM.createRoot(document.getElementById('root'));

const cookiesDict = Object.fromEntries(document.cookie.split(";").map((i) => [i.split("=")[0].replaceAll(" ",""), i.split("=")[1]]));

function CsrfToken(){
    let cookie = cookiesDict.csrftoken
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={cookie} />
    )
}


function LoginForm() {
    const [message, setMessage] = React.useState(cookiesDict.message)
    return (
        <div id="login-form-div">
            <form method='post' id="login-form">
                <CsrfToken/>
                <input type="text" placeholder="Username" name="username" />
                <input type="text" placeholder="Password" name="password" />
                <button id="login-button" type="submit">Login</button>
                {message?<div id="message">{message.slice(1,-1)}</div>:""}
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