import React, { Component } from "react";
import "../header/Header.css";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
// import Button from '@material-ui/core/Button';
class Header extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: "dispNone",
    };
  }
  showMenuHandler = () => {
    if (this.state.showMenu === "dispNone") {
      this.setState({ showMenu: "dispBlock" });
    } else {
      this.setState({ showMenu: "dispNone" });
    }
  };
  logoutHandler = () => {
    sessionStorage.removeItem("access-token");
    this.props.history.push("/");
  };
  onProfileClick = () => {
    this.props.history.push("/profile");
  };
  redirectToHome = () => {
    if (sessionStorage.getItem("access-token")) {
      this.props.history.push("/home");
    }
  };
  render() {
    return (
      <div>
        <div className="app-header">
          <div className="pointer" onClick={this.redirectToHome}>
            Image Viewer
          </div>
          {this.props.searchBox === true ? (
            <div className="search-box">
              <SearchIcon className="search-icon" />
              <InputBase
                placeholder="Search..."
                onChange={this.props.seachInputHandler}
              />
            </div>
          ) : (
            ""
          )}
          {this.props.profile === true ? (
            <div className="header-profile-icon">
              <Avatar onClick={this.showMenuHandler} className="pointer">
                <img
                  className="header-thumbnail"
                  src={this.props.profile_pic}
                  alt={"Profile-pic"}
                />
              </Avatar>
              <div className={this.state.showMenu}>
                <div className="dropdown-content">
                  {this.props.myAccount !== false ? (
                    <div>
                      <div onClick={this.onProfileClick} className="pointer">
                        My Account
                      </div>
                      <div className="divider" />
                    </div>
                  ) : (
                    ""
                  )}
                  <div onClick={this.logoutHandler} className="pointer">
                    Logout
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
export default Header;
