import { FaSpinner } from 'react-icons/fa'; 
import { IconContext } from 'react-icons'; 

const LoadingSpinner = () => {
  return (
    <IconContext.Provider value={{ className: "text-blue-600 animate-spin", size: "2em" }}>
      <div className="flex justify-center items-center h-screen">
        <FaSpinner />
      </div>
    </IconContext.Provider>
  );
};

export default LoadingSpinner;
