// pages/Unauthorized.jsx

const Unauthorized = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
        <p className="text-gray-600">You do not have permission to view this page.</p>
        <a href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Go Home
        </a>
      </div>
    );
  };
  
  export default Unauthorized;