import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="shadow bg-gray-200 dark:bg-gray-800 p-4 dark:text-white w-full mt-8">
            <ul className="flex justify-center  pb-3 mb-3">
                <li className="">
                    <Link to={"/"} className="px-2 text-gray-500 hover:text-gray-700">Home</Link>
                </li>
                <li className="">
                    <Link to={""} className="px-2 text-gray-500 hover:text-gray-700">FAQs</Link>
                </li>
                <li className="">
                    <Link to={"/about"} className="px-2 text-gray-500 hover:text-gray-700">About</Link>
                </li>
            </ul>
            <div className="text-center">
                <h2 className="mb-4">Connect with Us</h2>
                <div className="social-icons mb-4">
                    <Link to={""} className="me-3 text-gray-500 hover:text-gray-700"><i className="fab fa-facebook-f"></i></Link>
                    <Link to={""} className="me-3 text-gray-500 hover:text-gray-700"><i className="fab fa-twitter"></i></Link>
                    <Link to={""} className="me-3 text-gray-500 hover:text-gray-700"><i className="fab fa-instagram"></i></Link>
                    <Link to={""} className="me-3 text-gray-500 hover:text-gray-700"><i className="fab fa-linkedin-in"></i></Link>
                </div>
            </div>
            <div className="text-sm mt-2 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} <span style={{ fontFamily: "qualy", fontSize: "12px" }}> pico-library</span>. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;