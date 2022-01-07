import React, { Component } from "react";
import "./Profile.css";
import Header from "../../common/header/Header";
import Modal from "../../common/modal/Modal";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

/* Higher order component*/
const customStyles = (theme) => ({
  avatarStyle: {
    float: "left",
    width: "300px",
    height: "250px",
  },
  root: {
    margin: "2px auto",
    width: "80%",
    cursor: "pointer",
  },
});
/* Profile component class*/
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      username: "",
      count_of_posts: 0,
      hardCoded_profile_pic: sessionStorage.getItem("profile_picture"),
      fullName: "Devanathan Babu ",
      showModal: false,
      modalImageId: 0,
      currentModal: null,
    };
  }
  /*When a user clicks outside modal the toggle will happen*/
  toggle = () => {
    this.setState((prevState) => ({
      toggle: !prevState.toggle,
    }));
  };
  /* This method will be used to fetch data from API and update the state variables*/
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
      }
    });
  }
  /*This method will get post details for a given ID*/
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
          username: posts_available[0].username,
          count_of_posts: that.state.count_of_posts + 1,
        });
      }
    });
  };
  /* This below code will close the modal*/
  closeModal = () => {
    this.setState({ showModal: false,currentId:0,currentModal:null});
  }
  /* This below code will update the suername*/
  saveUsername = (event) => {
    this.setState({ showModal: false });
  }
  /* This below code will show the modal*/
  showNameUpdateModal = () => {
    this.setState({ showModal: true, currentModal: "usernameUpdate" });
  }
  /* This below code will update the username*/
  updateUsernameHandler = (value) => {
    this.setState({ showModal: false, fullName: value });
  }
  /*Image MOdal */
  showModalforId = (imageId) => {
    this.setState({ showModal: true, modalImageId: imageId, currentModal: "updateImageModal" });
  }
  render() {
    var modal = [];
    const { classes } = this.props;
    return (
      <div>
        <Header
          profile={true}
          myAccount={false}
          profile_pic={this.state.hardCoded_profile_pic}
          history={this.props.history}
        />
        <div className="account-info-container">
          <div>
            <Avatar
              src={this.state.hardCoded_profile_pic}
              alt="Profile picture"
              className={classes.avatarStyle}
            />
          </div>
          <div>
            <h2>
              {this.state.posts.length > 0 && this.state.posts[0].username}
            </h2>
            <div className="profile-info-wrapper">
              <div>Posts: 3</div>
              <div>Follows: 12</div>
              <div>Followed By: 22</div>
            </div>
            <div className="flex font-weight-600">
              {this.state.fullName}
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={this.showNameUpdateModal}
              >
                <EditIcon className={classes.editIcon} />
              </Button>
              {modal}
            </div>
          </div>
        </div>
        <div className={classes.root}>
          <GridList cellHeight={300} cols={3}>
            {this.state.posts &&
              this.state.posts.length > 0 &&
              this.state.posts.map((post) => (
                <GridListTile
                  key={post.media_url}
                  onClick={(e) => this.showModalforId(post.id)}
                >
                  <img
                    src={post.media_url}
                    alt="post"
                    width="250"
                    height="350"
                  />
                </GridListTile>
              ))}
          </GridList>
          {this.state.showModal === true && (
            <div id="modal">
              <Modal open={true}
                closeModal={this.closeModal}
                module={this.state.currentModal}
                performUpdate={this.updateUsernameHandler}
                posts={this.state.posts}
                currentId={this.state.modalImageId}
                profile_pic={this.state.hardCoded_profile_pic} 
                likeHandler={this.likeHandler}/>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(customStyles)(Profile);
