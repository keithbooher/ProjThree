import React from "react";

const ContactForm= props=>(
    <div className="contactUs">
        <form>

            <label id= "contact-name">Name</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Pancho Villa"/>
   
  
            <label id= "contact-email">Email</label>
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="pancho_villa@gmail.mx"/>

            <label id= "contact-message">Message</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="10"></textarea>
        
        </form>
    </div>
)

export default ContactForm;
