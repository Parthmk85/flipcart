import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#212121] text-white py-12 mt-12 pb-24 lg:pb-12">
            <div className="container-custom grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-xs">
                <div>
                    <h5 className="text-gray-500 mb-4 font-normal">ABOUT</h5>
                    <ul className="flex flex-col gap-2">
                        <li>Contact Us</li>
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Flipkart Stories</li>
                        <li>Wholesale</li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-gray-500 mb-4 font-normal">HELP</h5>
                    <ul className="flex flex-col gap-2">
                        <li>Payments</li>
                        <li>Shipping</li>
                        <li>Cancellation</li>
                        <li>Returns</li>
                        <li>FAQ</li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-gray-500 mb-4 font-normal">POLICY</h5>
                    <ul className="flex flex-col gap-2">
                        <li>Return Policy</li>
                        <li>Terms Of Use</li>
                        <li>Security</li>
                        <li>Privacy</li>
                        <li>Sitemap</li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-gray-500 mb-4 font-normal">SOCIAL</h5>
                    <ul className="flex flex-col gap-2">
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>YouTube</li>
                    </ul>
                </div>
                <div className="border-l border-gray-700 pl-4 md:col-span-2">
                    <h5 className="text-gray-500 mb-4 font-normal">Registered Office Address:</h5>
                    <p className="text-gray-300 leading-relaxed">
                        Flipkart Internet Private Limited, <br />
                        Buildings Alyssa, Begonia & <br />
                        Clove Embassy Tech Village, <br />
                        Outer Ring Road, Devarabeesanahalli Village, <br />
                        Bengaluru, 560103, <br />
                        Karnataka, India
                    </p>
                </div>
            </div>
            <div className="container-custom border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light">
                <div className="flex gap-4">
                    <span>Become a Seller</span>
                    <span>Advertise</span>
                    <span>Gift Cards</span>
                    <span>Help Center</span>
                </div>
                <div>© 2007-2024 Flipkart-Clone.com</div>
            </div>
        </footer>
    );
};

export default Footer;
