import React from "react";
import "../../../App.css";
import "./pricelist.css";

export default function PriceList() {
  return (
    <>
      <div className="container">
        <div id="price">
          {/* <!--price tab--> */}
          <div className="plan">
            <div className="plan-inner">
              <div className="entry-title">
                <h3>BASIC TABLE 30 </h3>
                <div className="price">
                  $15<span>/per 30min</span>
                </div>
              </div>
              <div className="entry-content">
                <ul>
                  <li>30 minutes reservation</li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- end of price tab-->
  <!--price tab--> */}
          <div className="plan basic">
            <div className="plan-inner">
              <div className="hot">hot</div>
              <div className="entry-title">
                <h3>BASIC TABLE 60+</h3>
                <div className="price">
                  $10 <span>/per 30min</span>
                </div>
              </div>
              <div className="entry-content">
                <ul>
                  <li>60+ minutes reservation</li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- end of price tab-->
  <!--price tab--> */}
          <div className="plan standard">
            <div className="plan-inner">
              <div className="entry-title">
                <h3>PRO TABLE 30</h3>
                <div className="price">
                  $25<span>/per 30min</span>
                </div>
              </div>
              <div className="entry-content">
                <ul>
                  <li>30 minutes reservation</li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- end of price tab-->
  <!--price tab--> */}
          <div className="plan ultimite">
            <div className="plan-inner">
              <div className="entry-title">
                <h3>PRO TABLE 60+</h3>
                <div className="price">
                  $20<span>/per 30min</span>
                </div>
              </div>
              <div className="entry-content">
                <ul>
                  <li>60+ minutes reservation</li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- end of price tab--> */}
        </div>
      </div>
    </>
  );
}
