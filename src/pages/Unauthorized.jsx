// pages/Unauthorized.jsx

const Unauthorized = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
        <p className="text-[var(--txt)]">You do not have permission to view this page.</p>
        <a href="/" className="mt-4 px-4 py-2 bg-[var(--darkgreen)] text-[var(--txt)] rounded-lg hover:bg-[var(--darkergreen)]">
          Go Home
        </a>
      </div>
    );
  };
  
  export default Unauthorized;