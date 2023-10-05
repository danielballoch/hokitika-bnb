import React from "react"
import styled from "@emotion/styled"
import Calendar from "react-calendar"
import DRP from "../components/dateRangePicker"
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { isWithinInterval } from "date-fns";


const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
iframe body {
margin: auto
}
.booking-form {
display: flex;
justify-content: center;
align-items: center;
margin: 100px 0;
}
.content-right {
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  input {
    margin-bottom: 10px;
  }
  .send-btn {
    margin-top: 10px;
    padding: 10px;
  }
  .padding {
    padding: 5px;
  }
}
`

function isWithinRange(date, range) {
  return isWithinInterval(date, { start: range[0], end: range[1] });
}

function isWithinRanges(date, ranges) {
  return ranges.some(range => isWithinRange(date, range));
}

let in3Days = new Date(2023, 9, 8);
let in5Days = new Date(2023, 9, 10);
let in13Days = new Date(2023, 9, 18);
let in15Days = new Date(2023, 9, 20);

const disabledRanges = [
  [in3Days, in5Days],
  [in13Days, in15Days],
];

function tileDisabled({ date, view }) {
  // Add class to tiles in month view only
  if (view === 'month') {
    // Check if a date React-Calendar wants to check is within any of the ranges
    return isWithinRanges(date, disabledRanges);
  }
}

const IndexPage = () => {
  return (
   <Wrapper>
    <iframe src="https://calendar.google.com/calendar/embed?src=fe9300b7ddf46ff6eade32d3c49a70f6d8f6d1a590f58cb616be99fc0844961a%40group.calendar.google.com&ctz=Pacific%2FAuckland" width="800" height="600" frameborder="0" scrolling="no"></iframe>
    <div className="booking-form">
      <Calendar tileDisabled={tileDisabled}/>
      <div className="content-right">
        <h2>Request Quote</h2>
        <label>Name:</label>
        <input className="padding" type="text"></input>
        <label>Phone:</label>
        <input className="padding" type="tel"></input>
        <label>Email:</label>
        <input className="padding" type="email"></input>
        <label>Booking Period:</label>
        <DRP tileDisabled={tileDisabled}/>
        <button className="send-btn">Send Enquiry</button>
      </div>
    </div>
   </Wrapper>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
