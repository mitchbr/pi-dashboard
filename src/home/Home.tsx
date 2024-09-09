import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from "react-router-dom";
import '../pages.css';
import './Home.css';

function Home() {
  return (
    <>
      <div className="page-body">
        <div className='page-grid home-page-grid'>
          <div className="grid-item grid-text home-top-left">
            <h2>Mitchell's Raspberry Pi</h2>
            <p>Welcome to my raspberry pi hub! Here, I have everything I am currently hosting on a raspberry pi 5 in my home office. 
              Some goals I have in hosting on a raspberry pi include:</p>
            <ul>
              <li>Self hosting so that I don't need to rely on free tiers with cloud hosting providers</li>
              <li>Learning about more of the infrastructure side of backend development, including standing up docker containers from scratch, developing my own CI/CD pipelines, or standing up databases from scratch and managing them in a linux "server" environment</li>
              <li>Learning more about React and other fullstack skills</li>
            </ul>
          </div>
          <div className="grid-item home-top-center">
            <img src="mitchell_headshot.jpg" alt='A picture of me!'></img>
            <div className="overlay">
              <div className="overlay-text">Hello there!</div>
            </div>
          </div>
          <div className="grid-item grid-text home-top-right">
              <Link to="/portfolio/" className="link"> 
                <h3>Portfolio</h3>
                <p>Check out my recent projects</p>
              </Link>
              <div className='list-separator'></div>
            <Link to="/stats/" className="link">
              <h3>Pi Stats</h3>
              <p>View the current CPU and memory usage</p>
            </Link>
          </div>
          <div className="grid-item home-bottom-left">
            <img src="cheesecake.jpg" alt='Some cheesecake I baked for a friends wedding'></img>
            <div className="overlay">
              <div className="overlay-text">I love to bake! I used to work in a cafe where I made their baked goods each day.</div>
            </div>
          </div>
          <div className="grid-item grid-text home-bottom-center">
              <a href="https://github.com/mitchbr" target="_blank" className="link"> 
                <div className="open-new-icon">
                  <h3>GitHub</h3>
                  <OpenInNewIcon fontSize="small" />
                </div>
                <p>My GitHub profile, where you can view my project repositories</p>
              </a>
              <div className='list-separator'></div>
            <a href="https://www.linkedin.com/in/mitchbr/" target="_blank" className="link">
              <div className="open-new-icon">
                <h3>LinkedIn</h3>
                <OpenInNewIcon fontSize="small" />
              </div>
              <p>Let's connect on LinkedIn!</p>
            </a>
          </div>
          <div className="grid-item home-bottom-right">
            <img src="mitchell_climbing.jpg" alt='Me climbing in Squamish, BC'></img>
            <div className="overlay">
              <div className="overlay-text">I've climbed for more than 8 years!</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
