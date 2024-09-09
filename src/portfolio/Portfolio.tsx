import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import '../pages.css';
import './Portfolio.css';

function Portfolio() {
  return (
    <>
      <div className='page-body'>
        <div className='grid-item grid-text'>
          <h2>Grocery List App</h2>
        </div>
        <div className='page-grid groceries-grid'>
          <div className='grid-item grid-text groceries-top-left'>
            <p>My most mature project, I use this to manage all of my grocery trips. It is built in Flutter, which provides me the flexibility to build for most systems, including web, Android and iOS.</p>
            <p>This project has seen many evolutions and plenty of experimenting. Originally, I was building it as an Android app with a SQLite backend. However, I wanted recipes to be more easily shareable, so I began building out an AWS API. I got a PoC up and running, but realized there would be some costs involved (RDS, API Gateway, and S3 lose free tier status after one year). It was likely my costs would be very low, but free always beats cheap, so I transitioned to Flutter Firestore.</p>
            <p>Firestore has been great, but I find it difficult to manage the number of reads used when wrapped in a Flutter StreamBuilder. I also like the idea of hosting things myself, so I am currently working to get an API running on the raspberry pi.</p>
          </div>
          <div className='grid-item groceries-top-center'>
            <img src="groc_checklist.png" alt='The checklist page'></img>
              <div className="overlay">
                <div className="overlay-text">The checklist page, used to make lists for going to the store</div>
              </div>
          </div>
          <div className='grid-item groceries-top-right'>
            <img src="groc_authors.png" alt='The authors page'></img>
            <div className="overlay">
              <div className="overlay-text">The authors page, go here to view other authors' recipes</div>
            </div>
          </div>
          <div className='grid-item groceries-bottom-left'>
            <img src="groc_recipes.png" alt='The recipes page'></img>
              <div className="overlay">
                <div className="overlay-text">The recipes list page, where personal and saved recipes can be browsed</div>
              </div>
          </div>
          <div className='grid-item groceries-bottom-center'>
            <img src="groc_recipe_details.png" alt='The recipe details page'></img>
              <div className="overlay">
                <div className="overlay-text">The recipes details page. View a recipe's instructions, and add ingredients to the checklist</div>
              </div>
          </div>
          <div className='grid-item grid-text groceries-bottom-right'>
            <a href="https://github.com/mitchbr/grocery_list_app" target="_blank" className="link">
              <div className="open-new-icon">
                <h3>Groceries Github</h3>
                <OpenInNewIcon fontSize="small" />
              </div>
              <p>View the app's GitHub repo in a new tab</p>
            </a>
            <div className='list-separator'></div>
            <a href="https://mitchbr.github.io/grocery_list_web/#/" target="_blank" className="link">
              <div className="open-new-icon">
                <h3>Groceries App</h3>
                <OpenInNewIcon fontSize="small" />
              </div>
              <p>Open the Groceries App in a new tab</p>
            </a>
          </div>
        </div>

        <div className='grid-item grid-text'>
          <h2>Block Puller</h2>
        </div>
        <div className='page-grid puller-grid'>
          <div className='grid-item grid-text puller-top-left'>
            <p>A quick step away from web apps, I decided I wanted to try out a fun Arduino project. The goal of this project was to clone a rock climbing training tool called a <a href="https://tindeq.com/product/progressor/">tindeq progressor</a>. What this progessor does is read force data and transmit via bluetooth low energy (BLE). This tool, paired with something like a <a href="https://tensionclimbing.com/product/the-block-2/">Tension Block</a>, enables me to have highly precise data when it comes to training my finger muscles, a key part of training for rock climbing.</p>
          </div>
          <div className='grid-item puller-top-center'>
            <img src="block.jpg" alt='The block puller'></img>
            <div className="overlay">
              <div className="overlay-text">The device, built from layered 1/8th inch maple sheets</div>
            </div>
          </div>
          <div className='grid-item grid-text puller-top-right'>
            <a href="https://github.com/mitchbr/BlockPullApp" target="_blank" className="link">
              <div className="open-new-icon">
                <h3>Block Puller Github</h3>
                <OpenInNewIcon fontSize="small" />
              </div>
              <p>View the GitHub repo in a new tab</p>
            </a>
          </div>
          <div className='grid-item puller-bottom-left'>
            <img src="block_puller.jpeg" alt='Demonstration of using the block puller'></img>
            <div className="overlay">
              <div className="overlay-text">Example usage of the device, I'm pulling on a flat 20mm edge with the device attached.</div>
            </div>
          </div>
          <div className='grid-item grid-text puller-bottom-center'>
            <p>With bluetooth transmission, I hope to someday pull that data into an iOS app and have a more rich experience, such as having built-in timers and force goals (Ie pull 100 lbs for 10 seconds). However, I've found some challenges with developing iOS apps that require bluetooth. </p>
            <p>As it turns out, I can't build web apps to use bluetooth, because the iOS webkit engine doesn't have bluetooth. An interesting thing with iOS is that <i>all</i> browsers run on webkit, including chrome, so there is no way around this. I could build a native iOS app, but that requires an Apple developer account, which is currently $100/year.</p>
            <p>I'm very interested in doing this, but it's on the backburner while I work on other things. For now I just use a simple iOS app called LightBlue that allows me to interface with BLE devices.</p>
          </div>
          <div className='grid-item puller-bottom-right'>
            <img src="block_open.jpg" alt='The block puller opened'></img>
            <div className="overlay">
              <div className="overlay-text">The device internals, with a Seeed Xiao processor.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Portfolio
