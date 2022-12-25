import React from "react";
import { Link } from "react-router-dom";
function Navbar()
{
    return (
        <>
            <div className="flex w-full items-center justify-center border" style={{ 'borderBottom': '1px solid black' }}>
                
                <ul className="flex py-4 px-0 w-max">
                    <li><Link className="no-underline text-black mx-2 font-semibold text-xs" to="/addblog">Add Blog</Link></li>
                    <li><Link className="no-underline text-black mx-2 font-semibold text-xs" to="/complain">Complains</Link></li>
                    <li><Link className="no-underline text-black mx-2 font-semibold text-xs" to="/blogs">Blogs</Link></li>
                    
                    <li><Link className="no-underline text-black mx-2 font-semibold text-xs" to="/faq">Logout</Link></li>
                    
                </ul>
                {/* <Link to="/"><img src={logo} className="w-48 mx-auto relative right-6"></img></Link> */}
                
                

            </div>
        </>
    );
}

export default Navbar;