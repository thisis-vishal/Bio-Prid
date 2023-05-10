import { React, useState, useEffect } from 'react'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Qsar from './pages/Qsar'
import Dti from './pages/Dti'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Models from './pages/Models'
import Guide from './pages/Guide'
import Account from './pages/Account'

const App = () => {

  const [signed, setSigned] = useState(false);

  useEffect(() => {
    (
      async () => {
        const response = await fetch("http://localhost:8000/user", {
          headers: { 'Content-Type': 'application/json' },
          credentials: "include",
        });

        const content = await response.json();
        //console.log(content);
        if (content.detail === "verified") {
          setSigned(true);
        }
        else {
          setSigned(false);
        }
      }
    )();
  });

  return (
    <Router>
      <Routes>
        <Route path='/' exact Component={() => <Home signed={signed} />} />
        <Route path='/signin' exact Component={() => <SignIn signed={signed} />} />
        <Route path='/signup' exact Component={() => <SignUp signed={signed} />} />
        <Route path='/qsar' exact Component={() => <Qsar signed={signed} />} />
        <Route path='/dti' exact Component={() => <Dti signed={signed} />} />
        <Route path='/models' exact Component={() => <Models signed={signed} />} />
        <Route path='/guide' exact Component={() => <Guide signed={signed} />} />
        <Route path='/account' exact Component={() => <Account signed={signed} />} />
        <Route path='/tv/:id' exact Component={Home} />
      </Routes>
    </Router>
  )
}

export default App;