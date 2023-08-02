import React from "react"// input field of the chatbox
import { useState } from "react";
import { setConstantValue } from "typescript";



export default function ChatInput(prop) {
  
  // handler function when submitting the form
  function submitForm(e: Event) {
    // prevent page from refreshing
    e.preventDefault();

    // e.target[0].value is the input field's value
    console.log(e.target[0].value);
    
    // make a copy of the original state
    const newState = {
      ...prop.state
    };

    // push new message to messgaes array in new state with content from input field
    newState.messages.push({
      user: 'Alwin',
      content: e.target[0].value
    });
  
    // use passed in setState function to update state and rerender
    prop.setState(newState)
    // e.target.reset() will reset the form after submission
    return e.target.reset();
  }


  return (
    <div>
      ~~ChatInput field
      <form onSubmit={submitForm}>
        <div>
          <input type='text' placeholder='Enter message...'></input>
          <input type='submit' value='Send!'></input>
        </div>
      </form>
    </div>
  )
}