import React, {useState} from 'react';



// this is where chatbox portion of the chatroom page lives



// define chatbox state at highest level here
type chatBoxState = {
  messages: {
    user: string,
    content: string
  }[],
  activeUsers: string[];
}

// fetch for chatroom info from db or let it be passed in from higher up???

