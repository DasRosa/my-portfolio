import React, {useState} from "react";
import { FaBars, FaFacebook, FaGithub, FaInstagramSquare } from 'react-icons/fa'

const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false);
    return (
        <nav>
            <div className='nav-center'>
                <div className='nav-header'>
                    <a href='/'><h2>Rosa Lu</h2></a>
                    <button className='nav-toggle' onClick={() => setShowLinks(!showLinks)}><FaBars /></button>
                </div>
                <div className={`${showLinks ? 'links-container show-container' : 'links-container'}`}>
                    <ul className='links'>
                        <li>
                            <a href='/post'>Post</a>
                        </li>
                        <li>
                            <a href='/project'>Project</a>
                        </li>
                        <li>
                            <a href='/about'>About</a>
                        </li>
                    </ul>
                </div>
                <ul className='social-icons'>
                    <li>
                        <a href='https://www.facebook.com/rosa.lu.92/'>
                            <FaFacebook />
                        </a>
                    </li>
                    <li>
                        <a href='https://github.com/DasRosa'>
                            <FaGithub />
                        </a>
                    </li>
                    <li>
                        <a href='https://www.instagram.com/rosa.lu.08/'>
                            <FaInstagramSquare />
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar