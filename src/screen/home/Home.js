import React, { Component } from "react";
import "./Home.css";
import { withStyles } from "@material-ui/core/styles";
import Header from "../../common/header/Header";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
/*Higher order component */
var styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  gridList: {
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.07)",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  response: {
    width: "49%",
    margin: "7px",
  },
  textFieldWidth: {
    paddingLeft: "30px",
    margin: "0 0 0 -7px",
    width: "80%",
  },
  hashTags: {
    display: "block",
    color: "#00376b",
  },
});

/* Home component class*/
class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      copyOfPosts: [],
      hardCoded_profile_pic: sessionStorage.getItem("profile_picture"),
      search_string: " ",
    };
  }
  /*When a user searches something on header search bar the request is handled here*/
  seachInputHandler = (event) => {
    this.setState({ posts: [], search_string: event.target.value });
    this.filterPostBySeachString(event.target.value);
  };
  /*This below code will format the date as per our need DD/MM/YY HH:MM:SS*/
  formatTime = (time) => {
    let tempFormat = new Date(time);
    let timeFormat =
      tempFormat.getUTCDate() +
      "/" +
      (tempFormat.getUTCMonth() + 1) +
      "/" +
      tempFormat.getUTCFullYear() +
      " " +
      tempFormat.getUTCHours() +
      ":" +
      tempFormat.getUTCMinutes() +
      ":" +
      tempFormat.getUTCSeconds();
    return timeFormat;
  };
  /*When a user likes the post the request is handled here*/
  likeHandler = (value) => {
    let number_of_posts = this.state.posts.length;
    var temp_array = this.state.posts;
    for (let i = 0; i < number_of_posts; i++) {
      if (temp_array[i].id === value) {
        if (temp_array[i].like === false) {
          temp_array[i].like = true;
          temp_array[i].likeCount++;
          temp_array[i].className = "red";
        } else {
          temp_array[i].like = false;
          temp_array[i].likeCount--;
          temp_array[i].className = "none";
        }
      }
      this.setState({ posts: temp_array });
    }
  };
  /*When a user comments on a post the request is handled here*/
  commentHandler = (id, value) => {
    let number_of_posts = this.state.posts.length;
    var temp_array = this.state.posts;
    for (let i = 0; i < number_of_posts; i++) {
      if (temp_array[i].id === id && value !== this.state.posts[0].username + ": ") {
        var comments = temp_array[i].comments;
        comments.push(value);
        temp_array[i].comments = comments;
      }
      this.setState({ posts: temp_array });
    }
  };
  /*All API fetch happens within componentDidMount method*/
  componentDidMount() {
    if (sessionStorage.getItem("access-token") === null) {
      this.props.history.push("/");
    }
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.open(
      "GET",
      "https://graph.instagram.com/me/media?fields=id,caption&access_token=" +
      sessionStorage.getItem("access-token")
    );
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var response_Received = JSON.parse(this.responseText);
        let number_of_posts = response_Received.data.length;
        for (let i = 0; i < number_of_posts; i++) {
          var id = response_Received.data[i].id;
          that.getPostDetailsForID(id);
        }
        that.setState({ copyOfPosts: response_Received.data });
      }
    });
  }
  /*This method will be used by serch feature in header search bar*/
  filterPostBySeachString = (search_string) => {
    let number_of_posts = this.state.copyOfPosts.length;
    for (let i = 0; i < number_of_posts; i++) {
      if (
        this.state.copyOfPosts[i].caption
          .toUpperCase()
          .includes(search_string.toUpperCase())
      ) {
        this.getPostDetailsForID(this.state.copyOfPosts[i].id);
      }
    }
  };
  /*When a id of a image is passed to the method this method will store the equavalent data to state variable by API fetch*/
  getPostDetailsForID = (id) => {
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.open(
      "GET",
      "https://graph.instagram.com/" +
      id +
      "?fields=id,media_type,media_url,username,timestamp,caption&access_token=" +
      sessionStorage.getItem("access-token")
    );
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var response = JSON.parse(this.responseText);
        response.like = false;
        response.likeCount = 7;
        response.comments = [];
        response.className = "none";
        let tags = "";
        let captionData = response.caption.split("#");
        response.caption = captionData[0];
        for (let i = 1; i < captionData.length; i++) {
          tags += "#" + captionData[i] + " ";
        }
        response.hashTags = tags;
        var posts_available = that.state.posts;
        posts_available.push(response);
        that.setState({
          posts: posts_available,
        });
      }
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header
          searchBox={true}
          profile={true}
          profile_pic={this.state.hardCoded_profile_pic}
          seachInputHandler={this.seachInputHandler}
          history={this.props.history}
        />
        <div className="show-case ">
          {this.state.posts.map((post) => (
            <div key={"instagram" + post.id} className={classes.response}>
              <Card className={classes.poster} variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar>
                      <img
                        className="thumbnail-image"
                        src={this.state.hardCoded_profile_pic}
                        alt={post.id}
                      />
                    </Avatar>
                  }
                  title={post.username}
                  subheader={this.formatTime(post.timestamp)}
                />

                <CardContent>
                  <img
                    src={post.media_url}
                    alt={post.id}
                    className="poster-image"
                  />
                  <div className="divider" />
                  <Typography>
                    <b>{post.caption}</b>
                    <span className={classes.hashTags}>{post.hashTags}</span>
                  </Typography>
                  <span
                    onClick={() => {
                      this.likeHandler(post.id);
                    }}
                  >
                    {post.className === "red" ? (
                      <FavoriteIcon className={post.className} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </span>
                  <span>{"  " + post.likeCount + "Likes"}</span>
                  <br />
                  {post.comments.map((comment) => (
                    <div key={"comment" + post.id + comment}>{comment}</div>
                  ))}
                  <FormControl>
                    <InputLabel htmlFor={post.id} required>
                      Add a comment
                    </InputLabel>
                    <Input
                      id={post.id}
                      type="text"
                      className={classes.textFieldWidth}
                    />
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      this.commentHandler(
                        post.id,
                        post.username +
                        ": " +
                        document.getElementById(post.id).value
                      )
                    }
                  >
                    ADD
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
