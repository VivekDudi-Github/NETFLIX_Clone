import React, { useState } from 'react'
import { useContentStore } from '../store/content';
import Navbar from '../Navbar'
import { Search } from 'lucide-react';
import axios from 'axios';
import { SMALL_IMG_BASE_URL } from '../utils/constants';

function SearchPage() {
    const [activeTab , setactiveTab] = useState('Movie')
    const [SearchTerm , setSearchTerm] = useState('')

    const [results , setResults] = useState([]) ;
    const {setContentType} = useContentStore() ;

    const handleSearch =async (e) => {
        e.preventDefault() ;
        
        try {
            const res = await axios.get(`/api/v1/search/${activeTab}/${SearchTerm}`)
            setResults(res.data.data)
        } catch (error) {
            toast.error('An Error Occured')
            setResults(null)
        }
    }

    console.log(results);
    
  return (
    <div className='bg-black min-h-screen text-white'>
        <Navbar />
        <div className='container mx-auto px-4 py-8'>
            {/* ACtive Tabs */}
            <div className='flex justify-center gap-3 mb-4'>
                <button 
                onClick={() => setactiveTab('Movie')}
                className={` py-2 px-4 rounded  hover:bg-rose-600  ${activeTab == 'Movie' ? 'bg-red-600' : 'bg-gray-800' } `} >
                    Movies
                </button>
                <button 
                onClick={() => setactiveTab('TV')}
                className={` py-2 px-4 rounded  hover:bg-rose-600  ${activeTab == 'TV' ? 'bg-red-600' : 'bg-gray-800' } `} >
                    TV Shows
                </button>
                <button 
                onClick={() => setactiveTab('Person')}
                className={` py-2 px-4 rounded  hover:bg-rose-600  ${activeTab == 'Person' ? 'bg-red-600' : 'bg-gray-800' } `} >
                    Person
                </button>
            </div>

            {/* FOrm */}
            <form onSubmit={handleSearch} className='flex gap-2 items-stretch mx-auto mb-8'>
                <input 
                type='text'
                value={SearchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={'Search a term for '+activeTab}
                className='w-full p-2 rounded bg-gray-800 text-white'
                />

                <button type='submit' className='bg-red-600 hover:bg-rose-700 text-white p-2 rounded'>
                    <Search className='w-6 h-6' />
                </button>
            </form>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
                {results.map((item) => 
                    <div className='p-2 rounded-md ' key={item.id}>
                        <img className='h-32 w-24 ' src={SMALL_IMG_BASE_URL+item.poster_path} alt="" />
                    
                        <h3 className='text-white'>{item.name || item.title}</h3>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default SearchPage