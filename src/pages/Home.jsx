import { Link } from "react-router-dom";
import SideBar from "../component/SideBar";
import Header from "../component/Header";

const Home = () => {
  return (
    <div className="main_wrapper">
      <SideBar/>
      <div className="inner_wrapper">
        <Header/>
        <div className="index_header"></div>
        <div className="inner_content">
          <div className="inner_body_section">
            <div className="home_body_content">
              <div className="full_logo">
                <h3 className="typewriter">What are you working on?</h3>
              </div>
             <div className="go_chat"> 
              <Link to="chat">
                  Go to Chat<img src="/src/assets/go_arrow.svg" className="logo"/>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;