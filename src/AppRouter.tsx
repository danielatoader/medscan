import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckView from "./components/views/CheckView";
import HomeView from "./components/views/HomeView";
import NotFoundView from "./components/views/NotFoundView";
import ScanView from "./components/views/ScanView";


function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomeView/>} />
                <Route path='/scan' element={<ScanView/>} />
                <Route path='/check' element={<CheckView/>} />
                <Route path='*' element={<NotFoundView />} />
            </Routes>
        </BrowserRouter>  
    );
}


export default AppRouter;