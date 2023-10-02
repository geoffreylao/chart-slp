import React, { Component } from "react";

export default class SiteClose extends Component {
  render() {
    return (
      <div className="homepage-text">
        <section id="how-to-use">
          <div className="container mx-6">
            <div className="row">
              <div className="col-lg">
   
                <h1 className="title-text">Thank you for all of your support!</h1>

                <div className = "logo">
                <img src="slippicharts_upscaled.png" alt="chartslp logo" className="chartslp-logo" />
                </div>
        

                <p className="how-to-text">As many of you may have noticed, the Chart.slp has been unavailable for some time now. Unfortunately I have made the difficult decision to take the service down due to costs of the server and database becoming unsustainable. </p>
               
                <p className="how-to-text">
                  Below is a link to download a backup of the database, BE AWARE the json file comes to over 140 GB extracted so prepare accordingly!
                </p>

                <p className="how-to-h1">
                  <a href='https://drive.google.com/file/d/1nNZ0scr7jxOF86gBdnnFqCBfroJdNwo5/view?usp=sharing' target="_blank" rel="noreferrer" className="btn btn-outline-light " role="button">DATABASE BACKUP</a>                 
                </p>

                <p className="how-to-text">
                Please check out these other Slippi projects if you are going to miss Chart.slp!
                </p>

                <p className="how-to-text">
                  <a href='https://github.com/cbartsch/Slippipedia' target="_blank" rel="noreferrer">Slippipedia</a> - Your flexible replay manager. Get insights and knowledge about your SSBM game quickly and easily.                  
                </p>

                <p className="how-to-text">
                  <a href='https://slippilab.com/' target="_blank" rel="noreferrer">Slippi Lab</a> - Watch, search, and share Slippi replays in the browser.                 
                </p>

                <p className="how-to-text">
                  <a href='https://vinceau.medium.com/introducing-project-clippi-2b323418e5f8' target="_blank" rel="noreferrer">Project Clippi</a> - Project Clippi is an automation framework for Super Smash Bros. Melee.                 
                </p>

                <p className="how-to-text">
                  <a href='https://bycn.github.io/2022/08/19/project-nabla.html' target="_blank" rel="noreferrer">Project Nabla</a> - Using a dataset of tournament players, we can train AIs that play Super Smash Bros. Melee in a competent and human-like manner.                
                </p>

                <p className="how-to-text">
                  <a href='https://github.com/SSBDoppler/slippi-hud' target="_blank" rel="noreferrer">Slippi Hud</a> - A nodecg package that can be used to power all kinds of slippi powered melee streams.                
                </p>

                <p className="how-to-text">
                The code always has and always will be open source. In the future I would like to provide a detailed guide on running the site for yourself locally, please be patient and keep a look out for it! In the meantime if you have any questions about the project, feel free to contact me through the options below.
                </p>

                <p className="how-to-h1">
                <a href='https://github.com/geoffreylao/chart-slp' target="_blank" rel="noreferrer" className="btn btn-outline-light " role="button">SOURCE CODE</a>                
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="footerSection">
          <div className="container mx-6">
            <div className='row'>

              <div className='col-lg-12 colFooter'>
                <div className="footer">
                  <p className="footer-logo">
                    <a href='https://twitter.com/gefflmao' target="_blank" rel="noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </p>
                  <p className="footer-logo">
                    <a href="https://discordapp.com/users/170002845079175168/" target="_blank" rel="noreferrer">
                      <i className="fab fa-discord"></i>
                    </a>
                  </p>
                  <p className="footer-logo">
                    <a href="mailto:geoffreylao@outlook.com" target="_blank" rel="noreferrer">
                      <i className="fas fa-envelope"></i>
                    </a>
                  </p>
                  <hr />
                  <h6>Chart.slp | Slippi Charts</h6>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}