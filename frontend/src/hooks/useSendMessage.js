import toast from "react-hot-toast"
import { useConversationContext } from "./useConversationContext"
import { useState } from "react"


const useSendMessage =  () => {
    const [loading, setLoading] = useState(false)
    const {selectedConversation, setSelectedConversation} = useConversationContext()
    
    const sendMessage = async (message) => {
         setLoading(true)
         try{
            const res = await fetch(`/api/messages/send/${selectedConversation?.currConversation?._id}`,{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({message})
            })
            const data = await res.json()
            console.log(res.ok)
            if(res.ok){
            setSelectedConversation((prevState) => ({
                ...prevState,
                messages: [...prevState.messages, data]
            }));

            }else{
               throw new Error(data.error)
            }
         }catch(error){
            toast(error.message)
         }finally{
            setLoading(false)
         }
    }

    return {loading, sendMessage}

}

export default useSendMessage