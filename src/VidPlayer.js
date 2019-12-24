import React, {Component} from 'react';
import Suggestion from "./Suggestion";
import {
  Form,
  Container,
  Embed,
  Divider,
  Grid,
  Icon,
  Header,
} from "semantic-ui-react";

class VidPlayer extends Component{
  constructor(){
    super();
    this.state = {
      query: 'space',
      url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&key=AIzaSyDYfC8I1ZFiWh6DWMUybfKM_k17ZVc4NqQ&q=',
      mainVideo: '',
      mainVideoImage: '',
      mainVideoTitle: '',
      suggestedVideos: [],
      moreSuggestions: []
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
         let suggestions = data.items.splice(0, 9);
         this.setState({
           ...this.state,
           mainVideo: firstVideo.id.videoId,
           mainVideoTitle: firstVideo.snippet.title,
           suggestedVideos: suggestions,
           moreSuggestions: data.items,
           mainVideoImage: firstVideo.snippet.thumbnails.high.url
         });
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
    this.setState({
      ...this.state,
      mainVideo: video.id.videoId,
      mainVideoImage: video.snippet.thumbnails.high.url,
      mainVideoTitle: video.snippet.title
    });
  }

  render(){
    console.log(this.state.mainVideoImage);
    return (
      <div>
        <Header as="h1" textAlign="left" color="red" style={{margin:"10px"}}>
          Vidapp
        </Header>
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

          <Header size="large" textAlign="left">
            {this.state.mainVideoTitle}
          </Header>

          <Embed
            id={this.state.mainVideo}
            placeholder={this.state.mainVideoImage}
            source="youtube"
          />

          <Divider horizontal>Suggestions</Divider>

          <Grid doubling columns={3}>
            {this.state.suggestedVideos.map((video, i) => (
              <Suggestion
                video={video}
                changeVideo={this.changeVideo}
                key={i}
              />
            ))}
          </Grid>

          <Divider horizontal> More Suggestions</Divider>

          <Grid doubling columns={5}>
            {this.state.moreSuggestions.map((video, i) => (
              <Suggestion
                video={video}
                changeVideo={this.changeVideo}
                key={i}
              />
            ))}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default VidPlayer;
