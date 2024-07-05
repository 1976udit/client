// import React from 'react';
import Input from "../../components/Input";
import Mafia from "../../assets/mafia.avif";
import three from "../../assets/3.webp";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Dashboard = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user:details")));
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({ mes: [], receiver: null, conversationId: null });
  const [message , setMessage] = useState('')
  const [users,setUsers] = useState([])
  

  // socket io
  const socket = io("http://localhost:5000");
  

  useEffect(() => {
    socket?.emit("addUser" , user?.id);
    socket?.on('getUsers', users => {
      console.log("Active Users : ",users)
    })
   
    socket.on("getMessage" , data => {
      console.log("Data => " , data)
      setMessages(prev => ({
       ...prev,
       mes : [...prev.mes , {user : data.user , mes : data.message}]
      }))
    })

  },[socket])


  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user:details"));
    const fetchConversation = async () => {
      const res = await fetch( `http://localhost:5000/api/conversation/${loggedInUser.id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const resData = await res.json();
      // console.log(resData)
      setConversations(resData);
      // console.log(typeof conversations);
    };
    fetchConversation();
  },[]);

  useEffect(()=>{
      const fetchUsers = async() => {
        // console.log(user.id)
        const res = await fetch(`http://localhost:5000/api/users/${user?.id}`,{
          method : "GET",
          headers : {
            "content-type" : "application/json"
          }
        })
        const UserData = await res.json()    
        setUsers(UserData)
      }
      fetchUsers()
  },[])


  const fetchMessage = async (conversationId , receiver) => {
    const res = await fetch(`http://localhost:5000/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const resData = await res.json();
    console.log(resData)
    setMessages({mes : resData, receiver , conversationId});
  };

  const sendMessage = async(e) => {

    socket?.emit("sendMessage", {
      senderId : user?.id,
      receiverId : messages?.receiver?.receiverId,
      message,
      conversationId : messages?.conversationId,
    })

    const res = await fetch(`http://localhost:5000/api/message` , {
      method : "POST",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        conversationId : messages?.conversationId,
        senderId : user.id,
        message,
        receiverId : messages?.receiver?.receiverId
      })
    })
    setMessage("")
  }

  return (
    <div className="w-screen flex">

      {/* Section 1 */}
      <div className="w-[25%] h-screen bg-secondary">
        <div className="flex items-center my-8 mx-10">
          <div className="border border-primary p-[6px] rounded-full">
            <img src={Mafia} alt="_blank" width={75} height={75} />{" "}
          </div>
          <div className="ml-8">
            <h3 className="text-2xl">{user.fullname}</h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr />
        <div className="mx-10 mt-4">
          <div className="text-primary text-lg">Messages</div>
          <div>
            {!conversations.length == 0 ? (
              conversations.map(({ conversationId, user }) => {
                return (
                  <div key={conversationId} className="flex items-center py-2 border-b border-b-gray-400">   
                    <div
                      className="cursor-pointer flex"
                      onClick={() => fetchMessage(conversationId,user)}
                    >
                      <div>
                        <img
                          src={Mafia}
                          className="rounded-full"
                          alt="_blank"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-semibold">
                          {user?.fullname}
                        </h3>
                        <p className="text-sm font-light text-gray-500">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold my-10">
                No Conversations
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Section 2 */}
      {
        messages?.receiver?.fullname?
        <div className="w-[50%] bg-white h-screen flex flex-col items-center"> 
        <div className="w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-8">
        <div>
          {" "}
          <img
            src={three}
            className="rounded-full"
            alt="_blank"
            width={50}
            height={50}
          />{" "}
        </div>
        <div className="ml-6 mr-auto">
          <h3 className="text-lg font-semibold">{messages?.receiver?.fullname}</h3>
          <p className="text-sm font-light text-gray-500">{messages?.receiver?.email}</p>
        </div>
        <div className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-phone-outgoing"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="black"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
            <path d="M15 9l5 -5" />
            <path d="M16 4l4 0l0 4" />
          </svg>
        </div>
      </div>
      
      <div className="h-[75%] w-full  overflow-y-scroll">
        <div className="h-[1000px] p-10">
          {messages?.mes?.length > 0 ? (
            messages.mes.map(({ message, user: { id } = {},index }) => {
              if (id === user?.id) {
                return (
                  <div key={index} className="max-w-[40%] bg-primary rounded-b-2xl rounded-tl-2xl ml-auto p-3 text-white mb-6">
                    {message}
                  </div>
                );
              } else {
                return (
                  <div key={index} className="max-w-[40%] bg-secondary rounded-b-2xl rounded-tr-2xl p-3 mb-6">
                    {message}
                  </div>
                );
              }
            })
          ) : (
            <div className="text-center text-lg font-semibold mt-14 ">
              No Message Yet
            </div>
          )}
        </div>
      </div> 

      <div className="p-8 w-full flex items-center">
        <Input
          placeholder="type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value) }
          className="w-full mr-2"
          inputClassName="p-3  border-0 shadow-md rounded-full bg-light outline-none focus:ring-0"
        />
        <div className={`"m-2 mt-2 p-2 cursor-pointer
           rounded-full bg-secondary ${!message && 'pointer-events-none'}"`} onClick={() => sendMessage() }>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-send"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#2c3e50"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 14l11 -11" />
            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
          </svg>
        </div>
        <div className={`"ml-3 mt-2 p-2 cursor-pointer
           rounded-full bg-secondary ${!message && 'pointer-events-none'}"`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-circle-plus"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#2c3e50"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M9 12h6" />
            <path d="M12 9v6" />
          </svg>
        </div>
      </div>  
    </div>
        : <div className="text-2xl flex items-center mx-auto font-semibold">No Conversation Selected!</div>
      }
     

       {/* Section 3 */}
      <div className="w-[25%]  h-screen bg-secondary flex items-center flex-col">
         <div className="text-primary text-lg m-5">Peaple</div>
         <div className="w-full">
         <div>
            {!users.length == 0 ? (
              users.map(({ conversationId, user }) => {
                return (
                  <div className="flex items-center py-2 border-b border-b-gray-400">
                    <div
                      className="cursor-pointer flex m-2"
                      onClick={() => fetchMessage("new",user)}
                    >
                      <div>
                        <img
                          src={Mafia}
                          className="rounded-full"
                          alt="_blank"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-semibold">
                          {user?.fullname}
                        </h3>
                        <p className="text-sm font-light text-gray-500">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold my-10">
                No Conversations
              </div>
            )}
          </div>
          </div>
      </div>
      
      </div>
)
}

export default Dashboard;
