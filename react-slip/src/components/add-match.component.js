import React, { Component } from "react";
import MatchDataService from "../services/match.service";
import ReactSpinner from 'react-bootstrap-spinner'

export default class AddMatch extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      matchesCollection: '',
      gamesTotal: 0,
      playersTotal: 0,
      insertedCheck: false
    }
}

  componentDidMount(){


    MatchDataService.getPlayers().then(response => {
      this.setState({
        playersTotal: response.data
      })
      console.log(response.data)
    })

    MatchDataService.getAll().then(response => {
      this.setState({
        gamesTotal: response.data
      })
      console.log(response.data)
    })
 
  }

  onFileChange(e) {
      this.setState({ matchesCollection: e.target.files })
  }

  onSubmit(e) {
    this.setState({
      filesLoaded: 'loading'
    })

    e.preventDefault()

    var formData = new FormData();
    for (const key of Object.keys(this.state.matchesCollection)) {
        formData.append('matchesCollection', this.state.matchesCollection[key])
    }
    console.log(this.state.matchesCollection)

    MatchDataService.create(formData).then((res) => {
      this.setState({
        filesLoaded: 'loaded'
      })
        console.log(res)
        this.setState({
          insertedCheck: res.data.inserted === 1 ? true : false
        })
    }, (error) => {
      console.log(error);
    });

    document.getElementById("FileSlp").value = "";
  }

  render() {
    const {filesLoaded, insertedCheck} = this.state;

    const renderFiles = () => {
      if(filesLoaded === 'loaded'){
        if(insertedCheck === true){
          return(
            <span>✓ Inserted</span>
          )
        }else{
          return(
            <span>✘ Failed</span>
          )
        }

      }else if(filesLoaded === 'loading'){
        return(          
          <ReactSpinner type="border" color="secondary" size="1.5" />            
        )
      }
    }

    return (
        <div className="homepage-text">
          <section id="title">
            <div className="container mx-6">
            <div className="row title-row">
              <div className="col-lg-6 title-logo titleCol">
                <img src="favicon.png" alt="chartslp logo" className="chartslp-logo"/>
              </div>
              <div className="col-lg-6 titleCol titleTextCol">
                <h1 className="title-text">Chart.slp | Slippi Charts</h1>
                <p className="title-text">This website is designed to provide simple and interactive charts for analyzing your Slippi Online games.</p>
                <h3>{this.state.gamesTotal ? this.state.gamesTotal : '------'} Matches Uploaded!</h3>
                <h3>{this.state.playersTotal ? this.state.playersTotal : '-----'} Unique Players!</h3>
                {/* <p className="title-text">Powered by Chart.js + Slippi-js</p> */}
                <a href="/charts" className="btn btn-outline-light " role="button">GENERATE CHARTS</a>
                <a href='https://github.com/geoffreylao/chart-slp' target="_blank" rel="noreferrer" className="btn btn-light " role="button">SOURCE CODE</a>
              </div>
            </div>
            </div>
          </section>
          <section id="upload">
            <div className='row'>
              <div className="container mx-6">
                <div className='col-lg-12'>
                  <h1 className="upload-h1">Upload Games</h1>                  
                </div>
                <div className="row">
                  <div className='col-lg-5 uploadCol singleUploader'>
                    <h3>Upload Single</h3>
                    <form onSubmit={this.onSubmit} encType="multipart/form-data">
                      <div className="form-group">
                          <input type="file" title="/" accept=".slp" name="matchesCollection" id="FileSlp" onChange={this.onFileChange} /> 
                      </div>
                      <div className="singleUploadText">
                      {renderFiles()}
                      </div>
                      <div className="form-group">
                          <button className="btn btn-secondary" type="submit">UPLOAD</button>
                      </div>
                    </form>
                  </div>
                    <div className='col-lg-7 uploadCol'>
                      <img src="chartslpuploader.png" alt="chartslp uploader logo" className="chartslp-uploader-logo"/>
                      <p className="uploaderText">Upload is currently limited to only 1 file at a time due to server limitations! If you'd like to upload in bulk please download the Uploader
                        Companion App.
                      </p>
                      <a href="https://github.com/geoffreylao/chart-slp-uploader-companion-app/releases/tag/v0.0.1" target="_blank" rel="noreferrer" className="btn btn-light " role="button">UPLOADER APP</a>
                    </div>
                  </div>
                </div>
              </div>
          </section>
          <section id="how-to-use">
            <div className="container mx-6">
              <div className="row">
                <div className="col-lg">
                  <h1 className="how-to-h1">How To Use</h1>

                  <p className="how-to-text">
                    1. Find your Slippi Replay Root Directory. By default these are stored in the C:\Users\[username]\Documents\Slippi directory. <br/><br/>

                    2. Click on 'Browse...' and select your .slp files and click the upload button. (NOTE: this site does not support zip file uploads!)<br/><br/>

                    3. Your files will begin to upload. Please leave the page open until the upload completes and avoid uploading again until the first upload finishes<br/><br/>

                    4. Once the upload is complete you can now generate your charts. Click on the 'Generate Charts' button at the top of the page to be directed to the charts page<br/><br/>

                    5. On the charts page, you must at least enter your own connect code. This is the code you give to others when using direct connect on Slippi Online. <br/><br/>

                    6. Optionally, you may further filter your games by opponent, characters played as and/or against, stages played, complete games only, and only games played within a specified date ranges<br/><br/>
                  </p>

                  <h1 className="how-to-h1">Caveats</h1>
                  <p className="how-to-text">
                    Teams games are currently not supported and will fail to be inserted into the database <br/><br/>

                    Duplicate games are handled and wont be uploaded twice<br/><br/>

                    Games played on non tournament legal stages will upload but won't have their stats displayed<br/><br/>

                    Mods like Beyond Melee are not prevented from having their replays uploaded
                  </p>

                  <h1 className="how-to-h1">Credits</h1>
                    <p className="how-to-text">
                    <a href='https://twitter.com/Fizzi36' target="_blank" rel="noreferrer">Fizzi</a> and the <a href='https://slippi.gg/about' target="_blank" rel="noreferrer">Team for Project Slippi</a>
                    </p>
                </div>
              </div>
            </div>
          </section>

          <section id="footerSection">
           <div className='row'>
              <div className="container mx-6">
                <div className='col-lg-12 colFooter'>                  
                  <div className="footer">
                      <p className="footer-logo">
                        <a href='https://twitter.com/gefflmao' target="_blank" rel="noreferrer">                          
                        <i className="fab fa-twitter"></i>
                        </a>
                      </p>
                      <p className="footer-logo">
                        <a href="https://discordapp.com/users/170002845079175168/"  target="_blank" rel="noreferrer">
                          <i className="fab fa-discord"></i>
                        </a>
                      </p>
                      <p className="footer-logo">
                        <a href="mailto:geoffreylao@outlook.com"  target="_blank" rel="noreferrer">
                          <i className="fas fa-envelope"></i>
                        </a>
                      </p>
                      <hr/>
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