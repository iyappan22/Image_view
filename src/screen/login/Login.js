import React, { Component } from "react";
import "./Login.css";
import Button from "@material-ui/core/Button";
import Header from "../../common/header/Header";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      loginControl: "disp-none",
      accessToken:
        "IGQVJXTlpST3RVdEtaSm9YLUY5eDBneVpHbXM1V094VEhpeUVhdWRFZAmNZAcWhmalByVTJDSjJZAd1hDM3pUUlhuamZAIYnNCY3MxdF9mM2hiSWdaTC1CUFpqT2tpdy03TWNyWndibHpaUzZA3ZATNrc1BjWQZDZD",
      dummy_username: "Dev",
      dummy_password: "12345678",
      usernameRequired: "disp-none",
      passwordRequired: "disp-none",
    };
  }
  /*This method will handle the login functions */
  loginClickHandler = () => {
    this.state.username === ""
      ? this.setState({ usernameRequired: "disp-block" })
      : this.setState({ usernameRequired: "disp-none" });
    this.state.password === ""
      ? this.setState({ passwordRequired: "disp-block" })
      : this.setState({ passwordRequired: "disp-none" });
    if (
      this.state.username === this.state.dummy_username &&
      this.state.password === this.state.dummy_password
    ) {
      this.setState({ loginControl: "disp-none" });
      sessionStorage.setItem("access-token", this.state.accessToken);
      sessionStorage.setItem(
        "profile_picture",
        "https://rukminim1.flixcart.com/image/416/416/mask/t/z/h/tom-jerry-face-free-size-original-imaefczgyqqpz56y.jpeg?q=70"
      );
      this.props.history.push("/home");
    } else if (this.state.username !== "" && this.state.password !== "") {
      this.setState({ loginControl: "disp-block" });
    } else {
      this.setState({ loginControl: "disp-none" });
    }
  };
/* When the user types something on username textbox the change is captured here*/
  inputUsernameChangeHandler = (e) => {
    this.setState({ username: e.target.value });
  };
/* When the user types something on password textbox the change is captured here*/
  inputPasswordChangeHandler = (e) => {
    this.setState({ password: e.target.value });
  };
  render() {
    return (
      <div>
        <Header />
        <div className="login-card">
          <br />
          <Card className="login-content">
            <CardContent>
              <b>LOGIN</b>
              <br />
              <br />
              <FormControl>
                <InputLabel htmlFor="user-name" required>
                  Username
                </InputLabel>
                <Input
                  id="user-name"
                  type="text"
                  onChange={this.inputUsernameChangeHandler}
                />
              </FormControl>
              <FormHelperText className={this.state.usernameRequired}>
                <span className="red">required</span>
              </FormHelperText>
              <br />
              <br />
              <FormControl>
                <InputLabel htmlFor="password" required>
                  Password
                </InputLabel>
                <Input
                  id="password"
                  type="password"
                  onChange={this.inputPasswordChangeHandler}
                />
              </FormControl>
              <FormHelperText className={this.state.passwordRequired}>
                <span className="red">required</span>
              </FormHelperText>
              <FormHelperText
                id="my-helper-text"
                className={this.state.loginControl}
              >
                <br />
                <span className="red">
                  {" "}
                  Incorrect username and/or password{" "}
                </span>
              </FormHelperText>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={this.loginClickHandler}
              >
                LOGIN
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}
export default Login;
