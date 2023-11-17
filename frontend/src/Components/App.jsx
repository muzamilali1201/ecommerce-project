import { Route, Routes } from 'react-router-dom'
import '../App.css'
import Signup from './Signup'
import Header from './Header'
import PrivateComponent from './PrivateComponent'
import Login from './Login'
import AddProduct from './AddProduct'
import ProductList from './ProductList'
import UpdateProduct from './UpdateProduct'
function App() {
  return (
      <div>
          <Header/>
          <Routes>
            <Route element={<PrivateComponent/>}>
            <Route path='/' element={<ProductList/>}/>
            <Route path='/add' element={<AddProduct />}/>
            <Route path='/update/:id' element={<UpdateProduct/>}/>
            <Route path='/logout' element={<h1>Logout</h1>}/>
            <Route path='/profile' element={<h1>profile</h1>}/>
            </Route>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/loginuser' element={<Login/>}/>
          </Routes>
      </div>
  )
}

export default App
