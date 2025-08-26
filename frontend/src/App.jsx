import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from './utils/Theme.js'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from './Component/NavBar.jsx';
import Dashboard from "./pages/DashBoard";
import Workouts from "./pages/WorkOut.jsx";
import Contect from "./pages/Contect.jsx";
import Blogs from "./pages/Blogs.jsx";
import Challanges from "./pages/Challanges.jsx";

import TutorialDetail from "./Component/TutorialDetail.jsx";
import TutorialList from "./pages/TutorialList.jsx";
import AddTutorial from "./Component/AddTutorial.jsx";
import BlogDetails from "./Component/BlogDetail.jsx";
import AddBlog from "./Component/AddBlog.jsx";
import EditBlog from "./Component/cards/EditBlog.jsx";
import Chatbot from "./Component/ChatBot.jsx";
import CreateClub from "./Component/club/CreateClub.jsx";
import EditClub from "./Component/club/EditClub.jsx";
import ClubDetails from "./Component/club/ClubDetails.jsx"
import ClubList from "./Component/club/ClubLIst.jsx";
import ChallengeDetails from "./Component/challenge/ChallengeDetails.jsx";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          <Container>
            <Navbar currentUser={currentUser} />
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/workouts" exact element={<Workouts />} />
              <Route path="/contact" exact element={<Contect />} />
              <Route path="/blogs" exact element={<Blogs />} />
              <Route path="/blogs/:id" exact element={<BlogDetails/>} />
              <Route path="/clubs" exact element={<ClubList />} />
              <Route path="/challanges" exact element={<Challanges />} />
              <Route path="/tutorials" exact element={<TutorialList/>} />
              <Route path="/tutorial/:id"  element={<TutorialDetail/>} />
              <Route path="/add-tutorial" element={<AddTutorial />} />
             <Route path="/add-blog" exact element={<AddBlog/>} />
             <Route path="/edit-blog/:id" exact element ={<EditBlog/>} />
             <Route path="/create-club" element={<CreateClub />} />
             <Route path="/edit-club/:id" element={<EditClub />} />
             <Route path="/clubs/:id" element={<ClubDetails />} />
             <Route path="/challenges/:id" element={<ChallengeDetails />} />


            </Routes>
            <Chatbot/>
          </Container>
        ) : ( 
          <Container>
            <Authentication />
  
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;