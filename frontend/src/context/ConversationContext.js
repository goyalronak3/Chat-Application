import { createContext, useState } from "react"

export const ConversationContext = createContext()

export const ConversationContextProvider = ({children}) => {
    const [selectedConversation, setSelectedConversation] = useState({currConversation : null, messages: []})
     return (
        <ConversationContext.Provider value={{selectedConversation, setSelectedConversation}}>{children}</ConversationContext.Provider>
     )
}