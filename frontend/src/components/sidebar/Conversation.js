import React from 'react'
import { useConversationContext } from '../../hooks/useConversationContext'

const Conversation = ({conversation, emoji, lastIdx}) => {
  const {selectedConversation, setSelectedConversation} = useConversationContext()
  const isSelected  = selectedConversation?.currConversation?._id === conversation._id
  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-4 py-1 cursor-pointer
       ${isSelected ? "bg-sky-500" : ""}
    `}
     onClick={() => setSelectedConversation({...selectedConversation, currConversation: conversation})}
    >
        <div className='avatar online'>
             <div className="w-12 rounded-full">
               <img src={conversation.profilePic} alt='User Profile pic'/>
             </div>
        </div>
        <div className='flex flex-col flex-1'>
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                    <span className='text-xl'>{emoji}</span>
                </div>
 		 </div> 
    </div>
    {!lastIdx &&  <div className='divider my-0 py-0 h-1' />}
    </>
  )
}

export default Conversation