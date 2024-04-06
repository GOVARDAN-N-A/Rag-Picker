import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductData from './productData'
import './pro.css';
import { FaMapLocationDot } from "react-icons/fa6";

const Events = () => {
  const [detail, setDetail] = useState(null);

  const detailPage = (event) => {
    setDetail(event);
  };

  const closeModal = () => {
    setDetail(null);
  };

  const openGoogleMaps = (location) => {
    window.open(location, '_self');
  };

  return (
    <>
      <br />
      <h2>LOCATION BASED SEARCH</h2>
      <br />
      {detail && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{detail.Title}</h5>
              </div>
              <div className="modal-body">
                <img src={detail.img} alt={detail.Title} className="product-image img-fluid mb-3" />
                <p>{detail.Date}</p>
                <p>{detail.des}</p>
              </div>
              <div className="modal-footer justify-content-between">
                <button className="location-btn btn btn-primary d-flex align-items-center mb-3" onClick={() => openGoogleMaps(detail.location)}>
                  <FaMapLocationDot className="location-icon mr-1" />
                  {' '} &nbsp; Location
                </button>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {ProductData.map((curEvent, index) => ( // Updated to use ProductData
            <div key={index} className="col">
              <div className="card h-100">
                <img src={curEvent.img} alt={curEvent.Title} className="card-img-top img-fluid" />
                <div className="card-body">
                  <h5 className="card-title">{curEvent.Title}</h5>
                  <div className='d-flex flex-row'>
                    <p className="card-text">{curEvent.Date}</p>
                    {/* Hide location text when detail is open */}
                    {/* {detail === null && <p className="card-text">{curEvent.location}</p>} */}
                  </div>
                  <button className="btn btn-danger" onClick={() => detailPage(curEvent)}>View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {detail && <div className="modal-backdrop custom-backdrop fade show"></div>}
    </>
  );
};

export default Events;
