import React, { useReducer } from 'react';
import { useAuthContext } from './AuthContext';
import { useParams } from 'react-router-dom';
import { ChatContext } from './ChatContext';

export default function ChatProvider({ children }) {
  const { user } = useAuthContext();
  const params = useParams();

  const INITIAL_STATE = {
    chatId: null,
    ohterUser: {},
  };

  const chatReducer = (state, action): any => {
    switch (action.type) {
      case 'CHANGE_USER': {
        return {
          otherUser: action.payload,
          chatId: params.id + (action.payload.uid > user.uid ? action.payload.uid + user.uid : user.uid + action.payload.uid),
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return <ChatContext.Provider value={{ data: state, dispatch }}>{children}</ChatContext.Provider>;
}
