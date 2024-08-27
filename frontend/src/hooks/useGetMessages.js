

import  { useEffect, useState } from 'react'
import { useConversationContext } from './useConversationContext'
import toast from 'react-hot-toast'

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const {currConversation, messages, setMessages} = useConversationContext()

    useEffect(() => {
       const getMessages = async () => {
         setLoading(true)
         try{
            const res = await fetch(`api/messages/send/${currConversation?._id}`)
            const data = await res.json()
            if(res.ok){
               setMessages(data)
            }else{
                throw new Error(data.error)
            }
         }catch(error){
            toast.error(error.message)
         }finally{
            setLoading(false)
         }
       }
       
       if(currConversation?._id) getMessages()
    },[currConversation?._id, setMessages])
    
  return { messages , loading} 

}

export default useGetMessages