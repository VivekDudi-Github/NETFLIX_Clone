import React, { useEffect, useRef, useState } from 'react'
import { useContentStore } from '../store/content';
import Navbar from '../Navbar'
import { Loader2Icon, Search, TrashIcon } from 'lucide-react';
import axios from 'axios';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { Link } from 'react-router-dom';

//todo : auto load further results 

function SearchPage() {
    const InputRef = useRef(null) ;

    const [activeTab , setactiveTab] = useState('Movie')
    const [SearchTerm , setSearchTerm] = useState('')

    const [results , setResults] = useState([]) ;
    const [queryHistory , setQueryHistory] = useState([]) ;

    const {setContentType} = useContentStore() ;
    const [ShowRecentQUery , setShowRecentQuery] = useState(false) ;

    const [isLoading , setIsLoading] = useState(false) ;

    const handleSearch =async (e) => {
        e.preventDefault() ;
        
        try {
            setIsLoading(true)
            const res = await axios.get(`/api/v1/search/${activeTab}/${SearchTerm}`)
            setResults(res.data.data)
            setIsLoading(false)
            let arr = queryHistory ;
            arr = [...arr ,{type : activeTab , text : SearchTerm}]
            setQueryHistory(arr)
        } catch (error) {
            toast.error('An Error Occured')
            setResults(null)
            setIsLoading(false)
        }
    }

    const handleTabClck = (type) => {
        if(type !== activeTab) setResults([])
        setactiveTab(type) ;
        if(type === 'Movie'){
            setContentType('movies')
        }else if(type === 'TV'){
            setContentType('tv')
        }   
    }

    const handleRemoveQuery = async(id , text) => {
        if(id){
            await axios.delete('/api/v1/search/query/history/'+id)
        }
        let arr = queryHistory ;
        arr = arr.filter(e => e.text !== text)
        setQueryHistory(arr)
    }

    useEffect(() => {
        const fetchQUeryHIstory = async() => {
            try {
                const res = await axios.get('/api/v1/search/query/history')
                setQueryHistory(res.data.data)
                
            } catch (error) {
                setQueryHistory([])
            }
        } ;
        fetchQUeryHIstory()
    } , [] )
    console.log(results);
    

  return (
    <div className='bg-black min-h-screen text-white' >
        <Navbar />
        <div className='container h-full mx-auto px-4 py-8'>
            {/* ACtive Tabs */}
            <div className='flex justify-center gap-3 mb-4'>
                <button 
                onClick={() => handleTabClck('Movie')}
                className={` py-2 px-4 rounded  hover:bg-rose-600  ${activeTab == 'Movie' ? 'bg-red-600' : 'bg-gray-800' } `} >
                    Movies
                </button>
                <button 
                onClick={() => handleTabClck('TV')}
                className={` py-2 px-4 rounded  hover:bg-rose-600  ${activeTab == 'TV' ? 'bg-red-600' : 'bg-gray-800' } `} >
                    TV Shows
                </button>
                <button 
                onClick={() => handleTabClck('Person')}
                className={` py-2 px-4 rounded  hover:bg-rose-600  ${activeTab == 'Person' ? 'bg-red-600' : 'bg-gray-800' } `} >
                    Person
                </button>
            </div>

            {/* FOrm */}
            <form onSubmit={handleSearch} className='flex gap-2 items-stretch mx-auto mb-8 relative'>
                <input 
                ref={InputRef}
                type='text'
                value={SearchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={'Search a term for '+activeTab}
                className='w-full p-2 rounded bg-gray-800 text-white'
                onFocus={() => setShowRecentQuery(true)}
                onClick={() => setShowRecentQuery(true)}
                onBlur={() =>{ setTimeout(() => {setShowRecentQuery(false) }, 500)}}
                />
                
                    <div className={`absolute overflow-auto max-h-[34vh] w-full top-12 border-gray-700 duration-300 ${ShowRecentQUery ? 'translate-y-0 visible' : "translate-y-16 opacity-0 invisible"} `}>
                        {queryHistory.slice().reverse().filter((e)=> e.type == activeTab).map((item , index) => (
                            <div className='flex justify-between p-2 pr-4 bg-black border-b-[1px] hover:bg-gray-800 border-gray-700 duration-200 ' 
                                key={index}>
                                <div 
                                onClick={() => {setSearchTerm(item.text || '') ; InputRef.current? InputRef.current.focus() : ''}}
                                className='w-full   '>
                                {item.text}
                            </div>
                            <TrashIcon 
                            onClick={() => handleRemoveQuery(item._id , item.text)}
                            className='text-red-500' />
                            </div>
                        ))}
                    </div>
                
                <button type='submit' className='bg-red-600 hover:bg-rose-700 text-white p-2 rounded'>
                    <Search className='w-6 h-6' />
                </button>
            </form>

            {isLoading && (
                <div className='w-full absolute top-1/2 flex justify-center z-10 items-center'>
                    <Loader2Icon  className='animate-spin  duration-200 font-bold text-rose-600 ' size={50}/>
                </div>
            )} 
            {!isLoading && (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 '>
                {results.map((item) => {
                    if(!item.poster_path && !item.profile_path) return null ;

                    return (
                        <>
                            <div className='bg-gradient-to-t from-gray-900 to-red-950 p-2 rounded' key={item.id}>
                                { activeTab == 'Person' ? (
                                    <Link to={'/actor/'+item.name} className='flex flex-col items-center' >
                                        <img src={SMALL_IMG_BASE_URL+item.profile_path}
                                        alt={item.name}
                                        className='max-h-96 rounded mx-auto' 
                                        />
                                        <h2 className='mt-2 text-xl font-bold' >{item.name}</h2>
                                    </Link>
                                ) : (
                                    <Link to={'/watch/'+item.id}>
                                        <img src={SMALL_IMG_BASE_URL+item.poster_path}
                                        alt={item.title || item.name} 
                                        className='w-full h-auto rounded'
                                        />
                                        <h2 className='mt-2 text-xl font-bold'>
                                            {item.title || item.name}
                                        </h2>
                                    </Link>
                                )}
                            </div>
                        </>

                    )
                })}
            </div>
            )}
        </div>
    </div>
  )
}

export default SearchPage