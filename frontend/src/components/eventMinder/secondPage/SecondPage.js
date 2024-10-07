import React from "react";
import { useNavigate } from "react-router-dom";
import "./SecondPage.css";
import Image from "../../../assets/secondPage.jpeg";
import Birthday from "../../../assets/birthday.jpeg";
import Memo from "../../../assets/memo.jpeg";
import Anniversary from "../../../assets/aniversary.jpeg";
import Other from "../../../assets/other.jpeg";

function SecondPage() {
  const navigate = useNavigate();

  const handleNavigateToBirthdays = () => {
    navigate("/birthday");
  };

  const handleNavigateToAnniversaries = () => {
    navigate("/anniversaries");
  };

  const handleNavigateToMemorialDates = () => {
    navigate("/mdates");
  };

  const handleNavigateToOtherSpecialDays = () => {
    navigate("/otherday");
  };

  return (
    <div className="main">
      <div className="row">
        <div className="col-12">
          <h1>Event Minder</h1>
        </div>
        <div className="col-12">
          <div className="row p-4">
            <div className="col-2"></div>
            <div className="col-4">
              <div className="button-group">
                <button onClick={handleNavigateToBirthdays}>Birthdays</button>
                <button onClick={handleNavigateToAnniversaries}>
                  Anniversaries
                </button>
                <button onClick={handleNavigateToMemorialDates}>
                  Memorial Dates
                </button>
                <button onClick={handleNavigateToOtherSpecialDays}>
                  Other Special Days
                </button>{" "}
              </div>
            </div>
            <div className="col-4">
              <img src={Image} alt="Image" />
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>

      <div className="event-section">
        <div className="event-card">
          <div className="row">
            <div className="col-4 p-3">
              <img src={Birthday} alt="Birthday" />
            </div>
            <div className="col-7 p-4">
              <h2>Birthdays</h2>
              <p>
                Text messages are used for personal, family, business, and
                social purposes. Government and non-government organizations in
                the 2010s started to use text messages to interact with
                citizens, as a part of e-government initiatives. In the 2010s,
                the sending of short (160 characters or fewer) text messages
                became an accepted part of many cultures, as happened earlier
                with emailing.
              </p>
              <button onClick={handleNavigateToBirthdays}>Click Here</button>
            </div>
          </div>
        </div>

        <div className="event-card">
          <div className="row">
            <div className="col-4 p-3">
              <img src={Anniversary} alt="Anniversary" />
            </div>
            <div className="col-7 p-4">
              <h2>Anniversaries</h2>
              <p>
                Text messages are used for personal, family, business, and
                social purposes. Government and non-government organizations in
                the 2010s started to use text messages to interact with
                citizens, as a part of e-government initiatives. In the 2010s,
                the sending of short (160 characters or fewer) text messages
                became an accepted part of many cultures, as happened earlier
                with emailing.
              </p>
              <button onClick={handleNavigateToAnniversaries}>
                Click Here
              </button>
            </div>
          </div>
        </div>

        <div className="event-card">
          <div className="row">
            <div className="col-4 p-3">
              <img src={Memo} alt="Memorial Dates" />
            </div>
            <div className="col-7 p-4">
              <h2>Memorial Dates</h2>
              <p>
                Text messages are used for personal, family, business, and
                social purposes. Government and non-government organizations in
                the 2010s started to use text messages to interact with
                citizens, as a part of e-government initiatives. In the 2010s,
                the sending of short (160 characters or fewer) text messages
                became an accepted part of many cultures, as happened earlier
                with emailing.
              </p>
              <button onClick={handleNavigateToMemorialDates}>
                Click Here
              </button>
            </div>
          </div>
        </div>

        <div className="event-card">
          <div className="row">
            <div className="col-4 p-3">
              <img src={Other} alt="Other Special Days" />
            </div>
            <div className="col-7 p-4">
              <h2>Other Special Days</h2>
              <p>
                Text messages are used for personal, family, business, and
                social purposes. Government and non-government organizations in
                the 2010s started to use text messages to interact with
                citizens, as a part of e-government initiatives. In the 2010s,
                the sending of short (160 characters or fewer) text messages
                became an accepted part of many cultures, as happened earlier
                with emailing.
              </p>
              <button onClick={handleNavigateToOtherSpecialDays}>
                Click Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondPage;