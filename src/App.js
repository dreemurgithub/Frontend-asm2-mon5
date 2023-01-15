import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import Page404 from './pages/Navbar/page404';
import Navbar from '../src/pages/Navbar/Navbar';
import Footer from '../src/pages/Navbar/Footer';
import User from '../src/pages/user/index' ;
import Login_context from "./context_data/user";
import {useState} from "react";

function App() {
    const [user_login, set_user_login] = useState('')
    return (
        <>
            <BrowserRouter>
                <Login_context.Provider value={[user_login, set_user_login]}>
                    <Navbar/>
                </Login_context.Provider>
                <>
                    <Login_context.Provider value={set_user_login}>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/user" element={<User/>}/>
                            <Route path="/search" element={<Search/>}/>
                            {/*<Route path="/detail" element={<Detail/>}/>*/}
                            <Route path="/detail/:id" element={<Detail/>}/>
                            <Route path="*" element={<Page404/>} status={404}/>
                        </Routes>
                    </Login_context.Provider>
                </>
                <Footer/>

            </BrowserRouter>
        </>
    );
}

export default App;
