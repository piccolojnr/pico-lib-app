import React from 'react';
import { Link } from 'react-router-dom';

function About() {
    return (
        <section id="about" className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">About Us</h2>
                    <p className="text-lg text-gray-700 mb-8">
                        Welcome to pico-library, where we're passionate about making books more accessible to everyone. Here's why we do what we do:
                        <br /><br />
                        <strong>Our Story:</strong> We've all struggled to find great reads, especially when resources are limited. That's why we're here – to create Link space where anyone can discover amazing books, regardless of their background.
                        <br /><br />
                        <strong>Why We're Here:</strong> Our goal is to make reading enjoyable, effortless, and inclusive for everyone. We believe that everyone deserves access to quality reading materials, no matter who they are or where they come from.
                        <br /><br />
                        <strong>This Project:</strong> As part of our journey at Holberton School, we've come together to bring our vision to life. We're thrilled to share our creation with you and make Link positive impact in the world of reading.
                    </p>
                    <div className="flex justify-center mb-8">
                        <div className='flex flex-col items-center justify-center'>
                            <h4 className='font-bold'>API</h4>
                            <Link target='_blank' to="https://github.com/piccolojnr/pico-lib-api" className="mr-4 text-blue-500 hover:text-blue-700">GitHub Repo</Link>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <h4 className='font-bold'>APP</h4>
                            <Link target='_blank' to="https://github.com/piccolojnr/pico-lib-app" className="mr-4 text-blue-500 hover:text-blue-700">GitHub Repo</Link>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4">Meet the Team</h3>
                    <div className="flex flex-wrap justify-center">
                        {/* Team member 1 */}
                        <div className="w-full sm:w-1/2 lg:w-1/3 mb-8 px-4">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h4 className="text-lg font-semibold mb-2">Daud Abdul-Rahim</h4>
                                <ul>
                                    <li><Link target='_blank' to="www.linkedin.com/in/rahim-daud-piccolo" className="text-blue-500 hover:text-blue-700">LinkedIn</Link></li>
                                    <li><Link target='_blank' to="https://github.com/piccolojnr" className="text-blue-500 hover:text-blue-700">GitHub</Link></li>
                                    <li><Link target='_blank' to="https://twitter.com/piccolojnr" className="text-blue-500 hover:text-blue-700">Twitter</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
