import React from "react";
import "./GiftOptions.css"; // Assuming you have CSS for styling

const GiftOptions = () => {
  return (
    <div className="gift-options-page">
      <div className="gift-options-content">
        <h1>Select a Gift Option</h1>
        
        <div className="gift-buttons">
          {/* Gift options with external links */}
          <a
            href="https://www.kapruka.com/?srsltid=AfmBOoq7icw2cCv64ReWcKA1Dab_a-zhuno5GKzf-wNCOYcJPfmvSPIP"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="gift-button kapruka">Kapruka</button>
          </a>

          <a
            href="https://lassana.com/?srsltid=AfmBOorp8-i5_lGcGa3B2BHiGdJRDeeVSKEfaDFLch-E1k9UTNrG5AJw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="gift-button lassana-flora">Lassana Flora</button>
          </a>

          <a
            href="https://visions.today/product/plant-gifts/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="gift-button cactus-by-dee">Cactus by Dee</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default GiftOptions;
