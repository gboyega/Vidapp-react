import React, {Component} from 'react';
import Suggestion from "./Suggestion";
import { Form, Container, Embed, Divider, Grid, Icon } from "semantic-ui-react";

class VidPlayer extends Component{
  constructor(){
    super();
    this.state = {
      query: 'space',
      url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=AIzaSyDYfC8I1ZFiWh6DWMUybfKM_k17ZVc4NqQ&q=' ,
      mainVideo: '',
      suggestedVideos: []
    };
    this.getVideos=this.getVideos.bind(this);
    this.searchVideos=this.searchVideos.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.changeVideo=this.changeVideo.bind(this); 
  }

  componentDidMount(){
    this.getVideos(this.state.query);
  }

  getVideos(searchQuery){
    let url = this.state.url + searchQuery;
    return(
      fetch(url).then(response => response.json())
      .then(data => {
         let firstVideo = data.items.shift();
         this.setState({...this.state, mainVideo:firstVideo.id.videoId, suggestedVideos:data.items});
        
      })
    )
  }

  handleChange(e){
    this.setState({...this.state, query:e.target.value});
  }

  searchVideos(e){
    e.preventDefault();
    this.getVideos(this.state.query);
  }

  changeVideo(video){
    this.setState({...this.state, mainVideo: video.id.videoId});
  }

  render(){
    console.log(this.state.mainVideo, process.env.REACT_APP_API_KEY);
    return (
      <div>
        <p></p>
        <Container textAlign="center">
          <Form onSubmit={this.searchVideos} size="large">
            <Form.Group>
              <Form.Input
                placeholder="Video Name/Tag"
                width={6}
                onChange={this.handleChange}
              />
              <Form.Button content="Get Videos" icon size="large" color="red">
                <Icon name="search" />
              </Form.Button>
            </Form.Group>
          </Form>

          <Embed id={this.state.mainVideo} placeholder="" source="youtube" />

          <Divider horizontal>Suggestions</Divider>

          <Grid doubling columns={3}>
            {this.state.suggestedVideos.map((video, i) => (
              <Suggestion video={video} changeVideo={this.changeVideo} key={i} />
            ))}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default VidPlayer;
