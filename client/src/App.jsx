import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProfilePage from './components/profile/profile';


function App() {
  // Assuming you have the user ID stored in state
  const [userId, setUserId] = useState('');

  // Function to set the user ID when it's available, for example after login
  const handleSetUserId = (id) => {
    setUserId(id);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUserId={handleSetUserId} />} />
        {/* Pass the userId prop to the ProfilePage component */}
        <Route path="/profile" element={<ProfilePage userId={userId} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
