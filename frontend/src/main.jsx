import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Mood from './pages/Mood.jsx'
import Meditation from './pages/Meditation.jsx'
import AiTherapy from './pages/AiTherapy.jsx'
import Sos from './pages/Sos.jsx'
import Community from './pages/Community.jsx';
import Profile from './pages/Profile.jsx';
import AboutUs from './pages/AboutUs.jsx';


const Main = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/moodmeter' element={

                    <Mood />

                } />
                <Route path='/aboutus' element={<AboutUs />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Register />} />
                <Route path='/meditation' element={<Meditation />} />
                <Route path='/AiTherapy' element={<AiTherapy />} />
                <Route path='/sos' element={<Sos />} />
                <Route path='/Community' element={<Community />} />
                <Route path='/profile' element={<Profile />} />
            </Route>
        )
    )

    return (

        <RouterProvider router={router} />

    )
};

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("Failed to find the root element");
}

createRoot(rootElement).render(
    <StrictMode>
        <Main />
    </StrictMode>,
)