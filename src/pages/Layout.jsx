import React from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';

function Layout({ children }) {

    return (
        <div className='flex flex-col justify-between items-center w-full h-full'>
            <Header />
            <div className="w-full  my-4">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout