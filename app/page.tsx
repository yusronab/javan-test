"use client"

import FilterForm from '@/components/FilterForm';
import Pagination from '@/components/Pagination';
import { APIresponse, PostsProps } from '@/types';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState<PostsProps[]>();
  const [originalPosts, setOriginalPosts] = useState<PostsProps[]>();
  const [filteredPosts, setFilteredPosts] = useState<PostsProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then(res => res.json() as Promise<APIresponse>)
      .then((data) => {
        setPosts(data.posts);
        setOriginalPosts(data.posts);
      });
  }, [])

  const itemsPerPage = 10;
  const totalPages = Math.ceil(posts?.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFilter = (filter: string, search: string) => {
    const filteredData = posts?.filter((post) => {
      const includesCategory = post.tags.includes(filter);
      const includesSearch = post.title.toLowerCase().includes(search.toLowerCase());

      if (filter === '') {
        return includesSearch;
      } else {
        return includesCategory && includesSearch;
      }
    });

    setPosts(filteredData);
  };

  const handleReset = () => {
    setPosts(originalPosts);
    setCurrentPage(1);
  };

  return (
    <main className="w-full">
      <div className="flex flex-row p-4">
        <FilterForm categories={["history", "american", "crime"]} onFilter={handleFilter} />
        <button
          onClick={handleReset}
          className="ml-5 border border-1 border-red-700 text-red-700 rounded-md px-2">
          Reset
        </button>
      </div>
      <div className="flex gap-3 flex-wrap justify-center items-center mt-5">
        {posts?.length !== 0 && (
          currentItems?.map((post, index) => (
            <div key={index} className="w-[300px] shadow-lg p-4 rounded-md">
              <h1 className="mb-4 text-red-500 line-clamp-1">{post.title}</h1>
              <div className="line-clamp-3">{post.body}</div>
              <div className="flex gap-2 mt-2">
                {post.tags.map((item, index) => (
                  <div className="bg-red-800 px-2 py-1 text-xs rounded-full text-white"
                    key={index}>{item}</div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </main>
  )
}
