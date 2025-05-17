'use client'

import { ChangeEvent, useState } from 'react'
import { socket } from './socket'

type Message = {
  id: string | number
  content: string
}

export default function Home() {
  const [msg, setMsg] = useState<string>('')
  const [msgs, setMsgs] = useState<Message[]>([])

  const handleChange = (ev: ChangeEvent): void => {
    const input = ev.target as HTMLInputElement
    setMsg(input.value)
  }
  const handleSubmitMessage = () => {
    const newMessage: Message = {
      id: Date.now(),
      content: msg,
    }

    socket.emit('message', { data: newMessage });
  }

  socket.on('message', ({ data }) => {
    setMsgs([...msgs, data])
    setMsg('')
  })

  return (
    <div>
      <div>
        <ul id='messages'>
          {msgs?.map((msg: Message) => (
            <li key={msg.id}>{msg.content}</li>
          ))}
        </ul>
      </div>

      {/* Writting zone */}
      <div className='border w-96 p-3 flex'>
        <input
          type="text"
          id='message'
          value={msg}
          onChange={handleChange}
          className='bg-slate-500'
        />
        <button onClick={handleSubmitMessage}
          className='bg-blue-500 rounded px-3' type='button'>Send</button>
      </div>
    </div>
  )
}
