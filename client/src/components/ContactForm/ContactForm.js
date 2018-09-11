import React from "react";
import "./contactForm.css";

const ContactForm = props => (
  <div className="contactUs">
    <form>
      <div className="form-group">
        <label id="contact-name">Name: </label>
        <input
          value={props.name}
          onChange={props.onChange}
          name="name"
          type="integer"
          className="form-control"
          id="inputName"
          placeholder="example: John Doe"
        />
      </div>
      <div className="form-group">
        <label id="contact-email">Email: </label>
        <input
          value={props.email}
          onChange={props.onChange}
          name="email"
          type="integer"
          className="form-control"
          id="inputEmail"
          placeholder="example: JohnDoe@email.com"
        />
      </div>
      <div className="form-group">
        <label id="contact-email">Subject: </label>
        <input
          value={props.subject}
          onChange={props.onChange}
          name="subject"
          type="integer"
          className="form-control"
          id="inputEmail"
          placeholder="example: Where's my art bro?"
        />
      </div>
      <div className="form-group">
        <label id="contact-message">Message: </label>
        <textarea
          value={props.textBody}
          onChange={props.onChange}
          name="textBody"
          className="form-control"
          id="inputText"
          rows="10"
          placeholder="example: My order hasn't been shipped to me and it's been 5 days"
        />
      </div>
    </form>
    <button
      onClick={() => props.submit()}
      className="btn btn-primary submitBtn"
      id="submit-btn"
    >
      Submit
    </button>
  </div>
);

export default ContactForm;
