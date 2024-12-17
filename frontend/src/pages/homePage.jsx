import { FaSearch } from "react-icons/fa";
import {Link} from "react-router-dom"
import { useMessageStore } from '../store/useMessageStore'
import {useEffect} from 'react'

const HomePage = () => {
  const {getFriends,friends} =useMessageStore()

 useEffect(()=>{
   getFriends()
 },[])
  return (
    <div className="overflow-y-scroll mb-20">
   {friends.map((item,i)=>{
      return <SingleChatblock key={i} name={item.name} id={item._id}/>}
      )}
      
    </div>
  );
};
export default HomePage;


const SingleChatblock=({name,id})=>{
  return <Link to={`/chat/${id}`} className="h-16 bg-gray-400 flex items-center px-2 text-white space-x-2 my-1 z-0">
  
  <div className="mask mask-squircle w-14">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />

</div>
<div className="w-2/3">
  <h2>{name}</h2>
  <p className="overflow-hidden truncate w-2/3">hellodjxjjdjsjxjdjjdjdjxxjxjxdjdjdjxjxjjdjdjdjxjxjxjxjxjxjdjdjxjdjdjxjfjdjdjdj</p>
</div>
<div className="text-xs">
   <p>12:10</p>
   <p className="text-green-600 font-bold">success</p>
</div>
  </Link>
}