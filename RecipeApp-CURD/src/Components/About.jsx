import React from 'react';
import './About.css';
const About = () => {
    return (
        <div className="about-container">
            <div className="about-image">
                <img
                    src="https://i0.wp.com/www.healthylifetips.co.uk/wp-content/uploads/2020/06/5ee1d3cec5f51.jpg?w=1000&ssl=1"
                    alt="Delicious Recipes"
                />
                <h1 className="about-title">About Recipe Book</h1>
            </div>

            {/* Content Section */}
            <div className="about-content">
                <p style={{ fontWeight: 'bold',fontSize:30}}>
                    Welcome to the Recipe Book!
                </p>
                <p>
                The Recipe Book is a user-friendly platform built with Vite + React, offering seamless CRUD operations for managing recipes. <br/>Users can create, read, update, and delete recipes, search by name, and enjoy a responsive, customizable interface.<br/>Designed for food enthusiasts and chefs, it simplifies cooking and recipe organization, ensuring an enjoyable experience.
                </p>
                <p style={{ fontWeight: 'bold',fontStyle:'italic',fontSize:25}}>
                Happy cooking! 🥘
                </p>
            </div>
        </div>
    );
};

export default About;
