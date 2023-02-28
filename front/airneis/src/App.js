import Login from './pages/backoffice/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
