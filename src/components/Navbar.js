import Link from 'next/link';


const Navbar = () => {
    return(
        <nav className='navbar'>
            <Link href='/' legacyBehavior><a className='navbar-brand'>Note App</a></Link>
            <Link href='/new' legacyBehavior><a className='create'>Create Note</a></Link>
        </nav>
    )

}

export default Navbar;

