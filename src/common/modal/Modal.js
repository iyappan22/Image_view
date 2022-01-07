import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import "./Modal.css";
function getModalStyle(props) {
  var top, left;
  if (props.module === "usernameUpdate") {
    top = 45;
    left = 40;
  } else {
    top = 40;
    left = 40;
  }
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
var updatedUsername = "";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }, paperModal: {
    display: "flex",
    position: "absolute",
    width: 1100,
    backgroundColor: theme.palette.background.paper,
    border: "2px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }, left: {
    width: 45,
  }, right: {
    position: "absolute",
    right: 0,
    width: "50%",
    padding: "4px",
  }, hashTags: {
    display: "block",
    color: "#00376b",
  },
  textFieldWidth: {
    paddingLeft: "30px",
    margin: "0 0 0 -7px",
    width: "80%",
  },
}));
function storeName(event) {
  updatedUsername = event.target.value;
}
export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle(props));
  const [open] = React.useState(false);

  const usernameUpdateHandler = () => {
    if (updatedUsername !== "") {
      props.performUpdate(updatedUsername + " ");
    }
    console.log(open);
  }
  const getpost = () => {
    let number_of_posts = props.posts.length;
    for (let i = 0; i < number_of_posts; i++) {
      if (props.posts[i].id === props.currentId) {
        return props.posts[i];
      }
    }
  }
  const updateUsername = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <h2 id="simple-modal-title">Edit</h2>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="username" required>
            Full Name
          </InputLabel>
          <Input id="username" type="text" onChange={storeName} />
        </FormControl>
      </div>
      <br />
      <br />
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={usernameUpdateHandler}
        >
          UPDATE
      </Button>
      </div>
    </div>
  );
  if (props.module !== "usernameUpdate") {
    var post = getpost(props.currentId);
    return (
      <Modal
        open={props.open}
        onClose={props.closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paperModal}>
          <div className={classes.left}>
            <img src={post.media_url} alt={post.id} className="poster-image_modal"></img>
          </div>
          <br />
          <br />
          <div>
            <div className={classes.right}>
              <Card className={classes.poster} variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar>
                      <img
                        className="thumbnail-image"
                        src={props.profile_pic}
                        alt={post.id}
                      />
                    </Avatar>
                  }
                  title={post.username}
                />
                <CardContent>
                  <div className="divider"></div>
                  <Typography>
                    <b>{post.caption}</b>
                  </Typography>
                  <br />
                  <div className={classes.hashTags}>{post.hashTags}</div>
                  <span>
                    {post.className === "red" ? (
                      <FavoriteIcon className={post.className} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </span>
                  <span>{"  " + 3 + "Likes"}</span>
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
                  >
                    ADD
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {updateUsername}
      </Modal>
    </div>
  );
}
