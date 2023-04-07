import { Route, Routes} from 'react-router-dom';
import Home from './Components/Home';
import Detail from "./Components/Detail"
import Navbar from './Components/Navbar';
import "./styles/Global.css"

function App() {

  	return (
	<div className="main">		
		<Navbar/>
		<div className='content'>
			<Routes>
				<Route path="/" element={ <Home/>}/>
				<Route path="/detail/:id" element={ <Detail/>}/>
			</Routes>
		</div>
	</div>);
}

export default App;
