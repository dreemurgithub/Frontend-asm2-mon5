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
import Date_context from "./context_data/date";
import {useState} from "react";
import Transaction from "./pages/transaction";

function App() {
    const [user_login, set_user_login] = useState('')

    const today = new Date();
    today.setDate(today.getDate() - 1)
    const [state, setState] = useState([
        {
            startDate: today,
            endDate: today,
            key: 'selection'
        }
    ]);
    const [date_state, setDate_state] = useState([new Date(), new Date()])

    return (
        <>
            <BrowserRouter>
                <Login_context.Provider value={[user_login, set_user_login]}>
                    <Navbar/>
                </Login_context.Provider>
                <>
                    <Date_context.Provider value={[state, setState , date_state, setDate_state]}>

                        <Login_context.Provider value={set_user_login}>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/user" element={<User/>}/>
                                <Route path="/search" element={<Search/>}/>
                                {/*<Route path="/detail" element={<Detail/>}/>*/}
                                <Route path="/detail/:id" element={<Detail/>}/>
                                <Route path="/transaction" element={<Transaction/>}/>
                                <Route path="*" element={<Page404/>} status={404}/>
                            </Routes>
                        </Login_context.Provider>
                    </Date_context.Provider>
                </>
                <Footer/>

            </BrowserRouter>
        </>
    );
}

export default App;
