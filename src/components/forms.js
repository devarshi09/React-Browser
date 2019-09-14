import React from 'react';
import { Field, reduxForm } from 'redux-form';


const Form = (props) => {
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field
            name="searchBar"
            component="input"
            type="text"
            placeholder="Enter URL"
          />
          <input type = "submit" hidden = "true">
             
        
        </form>
    )
}