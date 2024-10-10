import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Courses from './components/Courses';
import Loading from './components/Loading';

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true)


  const deleteCourse = (id) => {
    const afterDeletedCourses = courses.filter((course) => course.id !== id)
    setCourses(afterDeletedCourses);
  }

  const fetchCourses = async () => {
    setLoading(false)
    try {
      const response = await axios.get('http://localhost:3000/courses');
      setCourses(response.data)
      setLoading(false)
    }
    catch (error) {
      setLoading(false)
    }

    debugger;
  };
  useEffect(() => {
    fetchCourses();
  }, [])
  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <>
          {courses.length === 0 ? (
            <div className='refreshDiv'>
              <h2>Kursların Hepsini Sildiniz</h2>
              <button className='cardDeleteBtn2' onClick={()=>{fetchCourses()}}>Yenile</button>
            </div>
          ) : (<Courses courses={courses} removeCourse={deleteCourse} />)}
        </>

      )}
    </div>
  );
}

export default App;
