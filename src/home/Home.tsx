import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from "react-router-dom";
import '../pages.css';

function Home() {
  return (
    <>
      <div className='page__body'>
        <div className='page__body-content'>
          <h2>Mitchell's Raspberry Pi</h2>
          <p>Welcome to my raspberry pi hub! Here, I have everything I am currently hosting on a raspberry pi 5 in my home office. 
            Some goals I have in hosting on a raspberry pi include:</p>
            <ul>
              <li>Self hosting so that I don't need to rely on free tiers with cloud hosting providers</li>
              <li>Learning about more of the infrastructure side of backend development, including standing up docker containers from scratch, developing my own CI/CD pipelines, or standing up databases from scratch and managing them in a linux "server" environment</li>
              <li>Learning more about React and other fullstack skills</li>
            </ul>
        </div>
        <div className='page__body-content'>
          <h2>Pi Hub Pages</h2>
          <div className="page__body-content__grid">
            <div className="page__body-content__item">
              <Link to="/stats/" className="link">
                <h3>Pi Stats</h3>
                <p>View the current CPU and memory usage</p>
              </Link>
            </div>
            <div className="page__body-content__item">
              <Link to="/portfolio/" className="link"> 
                <h3>Portfolio</h3>
                <p>Check out my recent projects</p>
              </Link>
            </div>
          </div>
        </div>
        <div className='page__body-content'>
          <h2>External Links</h2>
          <div className="page__body-content__grid">
            <div className="page__body-content__item">
              <a href="https://mitchbr.github.io/grocery_list_web/" target="_blank" className="link">
                <div className="page__body-content__title_icon">
                  <h3>Groceries App</h3>
                  <OpenInNewIcon fontSize="small" />
                </div>
                <p>More information is available on the Portfolio page.</p>
              </a>
            </div>
            <div className="page__body-content__item">
              <a href="https://github.com/mitchbr" target="_blank" className="link"> 
                <div className="page__body-content__title_icon">
                  <h3>GitHub</h3>
                  <OpenInNewIcon fontSize="small" />
                </div>
                <p>My GitHub profile, where you can view my project repositories</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
