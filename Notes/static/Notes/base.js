const nav = ReactDOM.createRoot(document.getElementById('nav'));

function UserButton() {
    const [authenticated, setAuth] = React.useState(document.getElementById('user-authenticated').innerText)
    return (
        <div id="auth-button">
        {authenticated=="True"?<a href="/logout"><button>LogOut</button></a>:<a href="/login"><button>Login</button></a>}
        </div>
    )
}

function SiteName() {
    return(
        <div id="site-name">Notes</div>
    )
}

function Nav(p) {
    return (
        <>
        <SiteName/>
        <UserButton/>
        </>
    )
}
nav.render(<Nav/>)