import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';

const Navbar = () => {
    const { currentUser, setCurrentUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        setCurrentUser(null);
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-32">
                    <div className="flex items-center ">
                        <Link to="/" className="text-xl font-bold text-4xl text-blue-600" onClick={handleLogout}>
                            IONOTS Technologies - EdTech Platform
                        </Link>
                    </div>
                    
                    {currentUser && (
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">
                                {currentUser.name} ({currentUser.role})
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
// import React from 'react';
// import { Link, useLocation } from 'react-router';

// const Navbar = () => {
//   const location = useLocation();

//   const isActive = (path) => {
//     return location.pathname === path ? 
//       'bg-blue-700 text-white' : 
//       'text-blue-100 hover:bg-blue-600 hover:text-white';
//   };

//   return (
//     <nav className="bg-blue-500 shadow-lg">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex-shrink-0">
//             <Link to="/" className="text-white font-bold text-xl">
//               EdTech Platform
//             </Link>
//           </div>
//           <div className="flex space-x-4">
//             <Link
//               to="/"
//               className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/')}`}
//             >
//               Projects
//             </Link>
//             <Link
//               to="/progress"
//               className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/progress')}`}
//             >
//               My Progress
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;