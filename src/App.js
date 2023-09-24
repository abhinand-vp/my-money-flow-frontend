import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PageNotFound from './pages/PageNotFound';
import StartPage from './pages/StartPage';
import {
  ChakraProvider,
  theme
} from '@chakra-ui/react';

function App() {
  return (
    // <ChakraProvider theme={theme}>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
    // </ChakraProvider>
  );
}

export default App;
