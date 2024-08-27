import toast from "react-hot-toast"
import { useConversationContext } from "./useConversationContext"
import { useState } from "react"


const useSendMessage =  () => {
    const [loading, setLoading] = useState(false)
    const {currConversation, messages, setMessages} = useConversationContext()
    
    const sendMessage = async (message) => {
         setLoading(true)
         try{
            const res = await fetch(`/api/messages/send/${currConversation?._id}`,{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({message})
            })
            const data = await res.json()
            console.log(res.ok)
            if(res.ok){
               setMessages([...messages, data])
            }else{
               throw new Error(data.error)
            }
         }catch(error){
            toast.error(error.message)
         }finally{
            setLoading(false)
         }
    }

    return {loading, sendMessage}

}

export default useSendMessage