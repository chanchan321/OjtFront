import Login from './components/Login';
import Home from './Home';
import Missing from './components/Missing';
import Homepage from './Homepage'
import ListStudent from './components/Students/ListStudent';
import { Routes, Route } from 'react-router-dom';
import RequireAuthOnline from "./components/Auth/RequireAuthOnline";

function App() {

  return (
    <Routes>
     
        <Route path="/login" element={<Login />} />
        
           <Route path="/" element={<Home />}>
              <Route path="/" element={<Homepage/>}/>
              <Route element={<RequireAuthOnline allowed={["loggedIN"]}/>}>
                <Route path="listStudent" element={<ListStudent/>}/>
              </Route>
        </Route>
        <Route path="*" element={<Missing />} />
    
    </Routes>
  );
}

export default App;