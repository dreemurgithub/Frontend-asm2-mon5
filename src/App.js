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
import {useMemo, useState} from "react";
import Transaction from "./pages/transaction";
function App() {
    const [user_login, set_user_login] = useState('')

    const [people,set_people] = useState({ adult:0, kid:0
        ,city:'Da Nang',min:0,max:1000 , room:1  })
    const today = new Date();
    today.setDate(today.getDate() - 1)
    const [state, setState] = useState([
        {
            startDate: today,
            endDate: today,
            key: 'selection'
        }
    ]);
    const [date_state, setDate_state] = useState([today, today])
    useMemo(() => {//đổi ngày bắt đầu trong input
        setDate_state((date_state) => {
            console.log(['re render date start',date_state[0],state[0] ])
            date_state.map(el => el);
            date_state[0] = state[0].startDate
            return date_state;
        })
    }, [state[0].startDate])
    useMemo(() => {//đổi ngày end trong input
        setDate_state((date_state) => {
            console.log(['re render date end',date_state[1],state[0] ])
            date_state.map(el => el);
            date_state[1] = state[0].endDate
            return date_state;
        })
    }, [state[0].endDate])

    return (
        <>
            <BrowserRouter>
                <Login_context.Provider value={[user_login, set_user_login]}>
                    <Navbar/>
                </Login_context.Provider>
                <>
                    <Date_context.Provider value={[state, setState , date_state, setDate_state, people,set_people]}>

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
