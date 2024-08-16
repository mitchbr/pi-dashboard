import { Link } from "react-router-dom";
import './Home.css';

function Home() {
    return (
        <>
            <div className='home-body'>
                <h1>Mitchell's Raspberry Pi</h1>
                <p>Welcome to my raspberry pi hub! Here, I have everything I am currently hosting on a raspberry pi 5 in my home office. The main goal here is to learn about self hosting and managing small systems using technologies such as Docker</p>

                <h1>Hosted Sites</h1>
                <ul className="link-list">
                    <li><Link to="/stats/"> <button>Pi Stats</button> </Link></li>
                    <li><Link to="/portfolio/"> <button>Portfolio</button> </Link></li>
                </ul>
            </div>
        </>
    )
}

export default Home
