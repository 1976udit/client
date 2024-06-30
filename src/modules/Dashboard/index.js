// import React from 'react';
import Input from "../../components/Input";
import Girl from  "../../assets/girl.avif";
import cool from  "../../assets/cool.avif";
import Office from "../../assets/office.avif";
import Mafia from "../../assets/mafia.avif";
import one from "../../assets/1.webp";
import two from "../../assets/2.webp";
import three from "../../assets/3.webp";


const Dashboard = () => {
  const contact = [
    {
      name: "kt",
      img: Girl,
      status: "Available",
    },
    {
      name: "bansal",
      img: cool,
      status: "Sleeping",
    },
    {
      name: "tyagi",
      img: Office,
      status: "Thinking...",
    },
    {
      name: "pt",
      img: one,
      status: "Working",
    },
    {
      name: "kt",
      img: two,
      status: "Available",
    },
    {
      name: "kt",
      img: Mafia,
      status: "Available",
    }
  ];
  
  
  return (
    <div className="w-screen flex">
      <div className="w-[25%] h-screen bg-secondary">
        <div className="flex items-center my-8 mx-10">
          <div className="border border-primary p-[6px] rounded-full">
            <img src={Mafia} alt="_blank" width={75} height={75} />{" "}
          </div>
          <div className="ml-8">
            <h3 className="text-2xl">Udit Tyagi</h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr />
        <div className="mx-10 mt-4">
          <div className="text-primary text-lg">Messages</div>
          <div> 
            {contact.map(({ name, img, status }) => {
              return (
                <div className="flex items-center py-2 border-b border-b-gray-400">
                    <div className="cursor-pointer flex">
                       <div>
                         <img src={img} className="rounded-full" alt="_blank" width={50} height={50} />{" "}
                       </div>
                       <div className="ml-6">
                          <h3 className="text-lg font-semibold">{name}</h3>
                          <p className="text-sm font-light text-gray-500">{status}</p>
                       </div>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-[50%] bg-white h-screen flex flex-col items-center">
        <div className="w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-8">
        <div> <img src={three} className="rounded-full" alt="_blank" width={50} height={50} /> </div>
        <div className="ml-6 mr-auto">
            <h3 className="text-lg font-semibold">Amber</h3>
            <p className="text-sm font-light text-gray-500">Online</p>
        </div>
        <div className="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone-outgoing" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
        <path d="M15 9l5 -5" />
        <path d="M16 4l4 0l0 4" />
         </svg>
    </div>
   </div> 
          <div className="h-[75%] w-full  overflow-y-scroll">
              <div className="h-[1000px] p-10">
                  <div className="max-w-[40%] bg-secondary rounded-b-2xl rounded-tr-2xl p-3 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet ex egestas magna maximus dictum. 
                  </div>
                  <div className="max-w-[40%] bg-primary rounded-b-2xl rounded-tl-2xl ml-auto p-3 text-white mb-6">
                  Donec Donec consequat nibh in nisl tincidunt posuere.
                  </div>
              </div>

          </div>
      <div className="p-8 w-full flex items-center">
          <Input placeholder="type a message..." className="w-full" inputClassName="p-3  border-0 shadow-md rounded-full bg-light outline-none focus:ring-0" />
      <div className="ml-2 mt-2 p-2 rounded-full bg-secondary">
         <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
         <path d="M10 14l11 -11" />
         <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
         </svg>
      </div>
      <div className="ml-2 mt-2 p-2 rounded-full bg-secondary" >
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
          <path d="M9 12h6" />
          <path d="M12 9v6" />
          </svg>
      </div>
      </div>
      </div>
      <div className="w-[25%]  h-screen"></div>
    </div>
  );
};

export default Dashboard;
