import React from "react";
import"./contactForm.css";

const ContactForm= props=>(


    <div className="contactUs">
        <form>

            <label id= "contact-name">Name</label>
            <input value={props.name} onChange={props.onChange} name = "name" type="text" className="form-control" id="inputName"/>
   
  
            <label id= "contact-email">Email</label>
            <input value={props.email} onChange={props.onChange} name= "email" type="text" className="form-control" id="inputEmail"/>

            <label id= "contact-email">Subject</label>
            <input value={props.subject} onChange={props.onChange} name= "subject" type="text" className="form-control" id="inputEmail"/>            

            <label id= "contact-message">Message</label>
            <textarea value={props.textBody} onChange={props.onChange} name="textBody"className="form-control" id="inputText" rows="10"></textarea>
        </form>
        <button onClick={ () => props.submit()} className="btn btn-info" id= "submit-btn">Submit</button>
    </div>
)

export default ContactForm;
