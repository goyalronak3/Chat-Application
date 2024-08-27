import { createContext, useState } from "react"

export const ConversationContext = createContext()

export const ConversationContextProvider = ({children}) => {
   //  const [selectedConversation, setSelectedConversation] = useState({currConversation : null, messages: []})
    const [currConversation, setCurrConversation] = useState(null)
    const [messages, setMessages] = useState([])
     return (
        <ConversationContext.Provider value={{currConversation, setCurrConversation, messages, setMessages}}>{children}</ConversationContext.Provider>
     )
}