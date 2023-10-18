export default function Nav() {
    return (
        <nav className='navbar navbar-expand'>
            <div className='d-flex'>
                <a className='navbar-brand' href='/'>
                    CampenJoy
                </a>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <a className='nav-link' href='/'>
                            Home
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='/'>
                            Pets
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='/'>
                            About
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='/'>
                            Contact
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='/'>
                            Sign Up
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='/'>
                            Log In
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
