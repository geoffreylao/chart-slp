import React, { Component } from "react";
import MatchDataService from "../services/match.service";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import ReactSpinner from 'react-bootstrap-spinner'

function makeUL(array){
  // Create the list element:
  var list = document.createElement('ul');

  for (let i = 0; i < array.length; i++) {
    // create the list item:
    var item = document.createElement('li');
    
    // set its contents:
    item.appendChild(document.createTextNode(array[i]));

    // add it to the list:
    list.appendChild(item);
  }

  return list;
}

export default class AddMatch extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      matchesCollection: '',
      gamesTotal: 0
    }
}

  componentDidMount(){
    MatchDataService.getAll().then(response => {
      this.setState({
        gamesTotal: response.data[0]
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

    document.getElementById("failedarr").innerHTML = "";
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
        document.getElementById("inserted").innerHTML = "✓ Inserted: " + res.data.inserted;
        document.getElementById("failed").innerHTML = "✘ Failed: " + res.data.failed_arr.length;
        document.getElementById("failedarr").appendChild(makeUL(res.data.failed_arr));
    }, (error) => {
      console.log(error);
    });

    document.getElementById("FileSlp").value = "";
  }

  render() {
    const {filesLoaded} = this.state;

    const renderFiles = () => {
      if(filesLoaded === 'loaded'){
      }else if(filesLoaded === 'loading'){
        return(
            <div>
              <div><ReactSpinner type="border" color="primary" size="5" /></div>
            </div>
        )
      }
    }

    return (
        <div className="container">
            <div className="row">
              <div className='col-lg-12'>
                <Alert variant='danger'>
                  Upload is currently limited to only 1 file at a time due to server load issues! If you'd like to upload in bulk please download the&nbsp;
                  <a href='https://github.com/geoffreylao/chart-slp-uploader-companion-app/releases/tag/v0.0.1' target="_blank" rel="noreferrer">Uploader Companion App</a>&nbsp;
                  OR if you want to demo the site try using connect code GEFF#353
                </Alert>
              </div>
            </div>
            <div className="row">
            <div className='col-lg-6'>
              <h3>About &nbsp; </h3>

              <p>
              This website is designed to provide simple and interactive charts for analyzing your <a href='https://slippi.gg/' target="_blank" rel="noreferrer">Slippi Online</a> games<br/><br/>

              This website is inspired by <a href='https://slippistats.online/' target="_blank" rel="noreferrer">Slippi Stats Online</a> by Scott Norton if you like what you see here please give them some love!<br/><br/>

              Powered by Chart.js + Slippi-js<br/><br/>

              <a href='https://github.com/geoffreylao/chart-slp' target="_blank" rel="noreferrer">Source Code</a>
              </p>

              <h3>How To Use</h3>

              <p>
                1. Find your Slippi Replay Root Directory. By default these are stored in the C:\Users\[username]\Documents\Slippi directory. <br/><br/>

                2. Click on 'Browse...' and select your .slp files and click the upload button. (NOTE: this site does not support zip file uploads!)<br/><br/>

                3. Your files will begin to upload. Please leave the page open until the upload completes and avoid uploading again until the first upload finishes<br/><br/>

                4. Once the upload is complete you can now generate your charts. Click on the 'Generate Charts' button at the top of the page to be directed to the charts page<br/><br/>

                5. On the charts page, you must at least enter your own connect code. This is the code you give to others when using direct connect on Slippi Online. <br/><br/>

                6. Optionally, you may further filter your games by opponent, characters played as and/or against, stages played, complete games only, and only games played within a specified date ranges<br/><br/>
              </p>
            </div>
              <div className='col-lg-6'>             
                <div className='row'>
                  <div className='col-lg-12'>
                  <h3>{this.state.gamesTotal.matchId} Matches Uploaded!</h3>
                    <form onSubmit={this.onSubmit} encType="multipart/form-data">
                      <div className="form-group">
                          <input type="file" accept=".slp" name="matchesCollection" id="FileSlp" onChange={this.onFileChange} />
                      </div>
                      <div className="form-group">
                          <button className="btn btn-primary" type="submit">Upload</button>
                      </div>
                      <div>
                        <div id ="my_accordion">
                          <Accordion defaultActiveKey="1">
                            <Card.Header>
                              <h4 id="inserted"> </h4>
                            </Card.Header>
                            <Card>
                              <Accordion.Toggle as={Card.Header} eventKey="0">
                                <h4 id="failed"> </h4>
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                <Card.Body><div id="failedarr"> </div></Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                        </div>
                        {renderFiles()}
                      </div>
                    </form>
                  </div>
                </div>
                <div className='row' id='credits'>
                  <div className='col-lg-12'>
                  <h3>Caveats</h3>
                  <p>
                    Teams games are currently not supported and will fail to be inserted into the database <br/><br/>

                    Duplicate games are handled and wont be counted twice when generating stats<br/><br/>

                    Games played on non tournament legal stages will upload but won't have their stats displayed<br/><br/>
                  </p>
                  <h3>Credits</h3>
                  <p>
                    <a href='https://twitter.com/Fizzi36' target="_blank" rel="noreferrer">Fizzi</a> and the <a href='https://slippi.gg/about' target="_blank" rel="noreferrer">Team for Project Slippi</a>
                  </p>

                  <h3>Contact</h3>
                  <p>
                      If you run into any issues or would like to provide feedback, feel free to contact me on Discord (geff ◕‿◕✿#7261) 

                      or email me at at geoffreylao@outlook.com or on Twitter <a href='https://twitter.com/gefflmao' target="_blank" rel="noreferrer">@gefflmao</a>
                  </p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )
    }
}