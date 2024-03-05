const nav = ReactDOM.createRoot(document.getElementById('nav'));

const cookiesDict = Object.fromEntries(document.cookie.split(";").map((i) => [i.split("=")[0].replaceAll(" ",""), i.split("=")[1]]));


function UserButton() {
    const [authenticated, setAuth] = React.useState(cookiesDict['user-authenticated'])
    return (
        <div id="auth-button">
        {authenticated?<a href="/logout"><button>LogOut</button></a>:<a href="/login"><button>Login</button></a>}
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