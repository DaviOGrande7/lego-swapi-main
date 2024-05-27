import React, { useState, useEffect } from 'react';
import './App.css';
import { Spinner } from 'flowbite-react';
import Info from './Info';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ImPrevious, ImNext} from "react-icons/im";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dados, setDados] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/star-wars-copies/?populate=*&pagination[pageSize]=10&pagination[page]=${currentPage}`);
        const jsonData = await response.json();
        setDados(jsonData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Router>
      <div className='mainpage pb-20'>
        {dados ? (
          <div>
            <Routes>
              <Route path="/" element={<Info dados={dados} />} />
              <Route path="/:page" element={<Info dados={dados} />} />
            </Routes>
            <div className='fixed bottom-0 flex flow-row justify-center left-0 right-0 pb-10'>
              {currentPage > 1 && 
              <Link to={`/${currentPage - 1}`} onClick={handlePreviousPage}>
                <button pill>
                  <ImPrevious className='size-10 mr-1 bg-blue-600 rounded-full'></ImPrevious>
                </button>
              </Link>}
              {currentPage < 4 && 
              <Link to={`/${currentPage + 1}`} onClick={handleNextPage}>
                <button pill>
                  <ImNext className='size-10 bg-blue-600 rounded-full'></ImNext>
                </button>
              </Link>}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-screen">
            <Spinner aria-label="Center-aligned spinner example" size="xl" color="purple"/>
            <div className="text-4xl text-white">Carregando</div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
