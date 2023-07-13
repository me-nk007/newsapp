import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = ()=>{

const pageSize = 15;
let apiKey = process.env.REACT_APP_NEWS_API_KEY

const [progress, setProgress] = useState(0);

  
  
    return (
      <>
      <div>
        <Router>
        <NavBar></NavBar>
        <LoadingBar
        height = {4}
        color='#f11946'
        progress={progress}
      />
        {/* <News setProgress={this.setProgress} apiKey={this.apiKey}   pageSize={this.pageSize}{5} country="in" category="technology"/> */}
        <Routes>
        <Route exact path = "/" element = {<News setProgress={setProgress} apiKey={apiKey}   key="general" pageSize={pageSize} country="in" category="general" rang="primary"/>}> </Route>
        <Route exact path = "/business" element = {<News setProgress={setProgress} apiKey={apiKey}   key="business" pageSize={pageSize} country="in" category="business" rang="secondary"/>}> </Route>
        <Route exact path = "/entertainment" element = {<News setProgress={setProgress} apiKey={apiKey}   key="entertainment" pageSize={pageSize} country="in" category="entertainment" rang="success"/>}> </Route>
        <Route exact path = "/general" element = {<News setProgress={setProgress} apiKey={apiKey}   key="general" pageSize={pageSize} country="in" category="general" rang="primary"/>}> </Route>
        <Route exact path = "/health" element = {<News setProgress={setProgress} apiKey={apiKey}   key="health" pageSize={pageSize} country="in" category="health" rang="danger"/>}> </Route>
        <Route exact path = "/science" element = {<News setProgress={setProgress} apiKey={apiKey}   key="science" pageSize={pageSize} country="in" category="science" rang="warning"/>}> </Route>
        <Route exact path = "/sports" element = {<News setProgress={setProgress} apiKey={apiKey}   key="sports" pageSize={pageSize} country="in" category="sports" rang="info"/>}> </Route>
        <Route exact path = "/technology" element = {<News setProgress={setProgress} apiKey={apiKey}   key="technology" pageSize={pageSize} country="in" category="technology" rang="dark"/>}> </Route>
        </Routes>
        </Router>
      </div>
      </>
    ) 
}
export default App;
