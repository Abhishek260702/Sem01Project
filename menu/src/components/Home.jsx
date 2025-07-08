
import React from 'react';

import './Home.css';

const Home = () => {
  return (
    <>
      <header className="main-header">
        <div className="logo">Hotel <span>Solitaire</span></div>
        <p className="tagline">Hotel Solitaire is a refined luxury hotel designed to offer guests an exceptional experience of comfort, 
            elegance, and personalized service. Nestled in the heart of the city, Solitaire combines modern amenities with warm hospitality,
             making it an ideal destination for both leisure travelers and business guests.</p>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to Hotel Solitaire</h1>
          <p>Experience comfort, elegance, and warmth</p>
          
        </div>
      </section>

      <section className="about" id="about">
        <h2>About Hotel Solitaire</h2>
        <p>
          Located in the heart of the city, Hotel Solitaire brings you luxurious rooms,
          gourmet dining, and unparalleled hospitality. Whether it's a family vacation or a business trip,
          we promise a remarkable stay.
        </p>
      </section>

      <section className="features" id="features">
        <h2>Our Highlights</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>4 Star</h3>
            <p>Four-Star Comfort, Five-Star Service</p>
          </div>
          <div className="card">
            <h3>Fine Dining</h3>
            <p>Multi-cuisine dishes curated by top chefs in our in-house restaurant.</p>
          </div>
          <div className="card">
            <h3>Exclusive Spa</h3>
            <p>Unwind and refresh with our relaxing wellness facilities.</p>
          </div>
        </div>
      </section>

     

      
    </>
  );
}

export default Home;
