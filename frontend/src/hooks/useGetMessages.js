

import  { useEffect, useState } from 'react'
import { useConversationContext } from './useConversationContext'
import toast from 'react-hot-toast'

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const {selectedConversation, setSelectedConversation} = useConversationContext()

    useEffect(() => {
       const getMessages = async () => {
         setLoading(true)
         try{
            const res = await fetch(`api/messages/send/${selectedConversation?.currConversation?._id}`)
            const data = await res.json()

            if(res.ok){
               setSelectedConversation({...selectedConversation, messages: data})
            }else{
                throw new Error(data.error)
            }
         }catch(error){
            toast(error.message)
         }finally{
            setLoading(false)
         }
       }
       
       if(selectedConversation?.currConversation?._id) getMessages()
    },[selectedConversation?.currConversation?._id])
    
  return { messages : selectedConversation.messages , loading} 

}

export default useGetMessages