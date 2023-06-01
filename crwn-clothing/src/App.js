import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';

import {Routes, Route} from "react-router-dom";



const Shop = () => {
  return <h2>I am the shop page</h2>
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}></Route>
        <Route path='/shop' element={<Shop/>}></Route>
        <Route path='/auth' element={<Authentication/>}></Route>
      </Route>
    </Routes>
  );
};

export default App; 