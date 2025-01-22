import React, { useState , useEffect } from 'react'
import axios from 'axios'
import Navbar from '../Navbar'
import {SMALL_IMG_BASE_URL} from '../utils/constants'
import { Trash2, Underline } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useContentStore } from '../store/content';


function formatedDate(dateString) {
	// Create a Date object from the input date string
	const date = new Date(dateString);

	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// Extract the month, day, and year from the Date object
	const month = monthNames[date.getUTCMonth()];
	const day = date.getUTCDate();
	const year = date.getUTCFullYear();

	// Return the formatted date string

  if(isNaN(year)){
    return ''
  }else{
    return `${month} ${day}, ${year}`;
  }
}



function HistoryPage() {
    const [SearchHistory , setSearchHistory] = useState([]) 
    const Navigate = useNavigate() ;
    const {setContentType} = useContentStore() ;
    useEffect(() => {
      
    const getSearchHistory = async() => {
        try {
        const res = await axios.get('/api/v1/history')
        
        setSearchHistory(res.data.data?.visited)
      } catch (error) {
        console.log(error);
        setSearchHistory([])
      }
    } 
    getSearchHistory() ;
    }, [])
    
    const handleDelete  = async(item) => {
      try {
        await axios.delete(`/api/v1/history/${item.id}`)
        setSearchHistory(SearchHistory.filter((e) => e.id !== item.id) ) 
      } catch (error) {
        toast.error('failed to delete the element')
      }
    }
console.log(SearchHistory);
    const handleWatchLink = async(id , type) => {
      console.log('1');
      if(type == 'Movie'){
        setContentType('movies')
      }else if(type == 'TV'){
        setContentType('tv')
      }
      
      Navigate('/watch/'+id)
    }

  if(setSearchHistory.length === 0){
    return (
      <div className='bg-black min-h-screen text-white'>
				<Navbar />
				<div className='max-w-6xl mx-auto px-4 py-8'>
					<h1 className='text-3xl font-bold mb-8'>Search History</h1>
					<div className='flex justify-center items-center h-96'>
						<p className='text-xl'>No search history found</p>
					</div>
				</div>
			</div>
  )
  }
  return (
    <div className='bg-black text-white min-h-screen'>
      <Navbar />
      <div className='mx-auto px-4 py-8 max-w-6xl'>
        <h1 className='text-3xl font-bold mb-8'>Search History</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {SearchHistory.slice().reverse().map((item) => (
            <div className='bg-gray-800 p-4 rounded flex items-start duration-200' key={item?._id}>
              <div onClick={() => handleWatchLink(item.id , item.type)} className='flex flex-col gap-2 hover:cursor-pointer'>
                <img className='h-24 w-16 object-cover mr-4 overflow-hidden' src={SMALL_IMG_BASE_URL+item.avatar} alt={'load_failed'} />
                <span className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${item.type =='Movie' ? 'bg-red-600' : item.type == 'TV' ? "bg-blue-600" : 'bg-green-600'}`}>
                {item.type}
              </span>
              </div>   
              <div className='flex flex-col'>
                <span className='text-white text-base'>{item.name}</span>
                <span className='text-gray-400 text-xs'>{formatedDate(item.createdAt) || ' '}</span>
                <span className='text-gray-400 text-sm'></span>
              </div>
              
              <Trash2 className='size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600'
              onClick={() => handleDelete(item)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HistoryPage