// import Form from './modules/form';
import './App.css';
import Dashboard from './modules/Dashboard';
import Form from './modules/form'
import { Routes,Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ( {children} ) => {
   const isLoggedIn = localStorage.getItem('user:token') !== null || true;
  //  console.log(isLoggedIn)
   if(!isLoggedIn) {
      return <Navigate to={"/users/sign-in"} />
   } else  if(isLoggedIn && ['/users/sign-in','/users/sign-up'].includes(window.location.pathname)){
      return <Navigate to={"/"} />
   }
 return children;
}

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path='/users/sign-in' element={
        <ProtectedRoute>
          <Form isSignedIn={true}/>
        </ProtectedRoute>
      }  />
      <Route path='/users/sign-up' element={
        <ProtectedRoute>
          <Form isSignedIn={false} /> 
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
