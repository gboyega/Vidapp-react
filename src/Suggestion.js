import React from "react";
import {Grid, Image, Header } from "semantic-ui-react";

const Suggestion = (props) => {

    const performVideoChange = () => {
        props.changeVideo(props.video);
    };

    return (
      <Grid.Column onClick={performVideoChange}>
        <Image src={props.video.snippet.thumbnails.medium.url} />
        <Header size="small" textAlign="left">
          {props.video.snippet.title}
        </Header>
      </Grid.Column>
    );
}

export default Suggestion;