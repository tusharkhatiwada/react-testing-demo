import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Layout, Menu, notification } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlayCircleFilled,
  PauseCircleFilled,
  AppstoreFilled,
  HomeFilled,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import axios from "axios";

import Login from "./components/login";
import OpenJobs from "./components/jobs/OpenJobs";

import "./App.css";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const AppRouter = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    collapsed: false,
  });
  const handleLogout = () => {
    axios
      .get("/logout")
      .then(response => {
        const res = response.status;
        if (res === 200) {
          console.log("Logged out");
        } else {
          notification.error({
            message: "Error",
            description: "Error while logging out. Please try again later",
          });
        }
      })
      .catch(err => {
        notification.open({
          message: "Error",
          description: "Error while logging out. Please try again later",
        });
        console.log("Error in logging out: ", err);
      });
  };
  return (
    <Router>
      <>
        <Route exact path='/' component={Login}></Route>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={state.collapsed}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              backgroundColor: "#004d6f",
            }}
          >
            <div className='logo' />
            <Menu
              theme='dark'
              mode='inline'
              style={{ backgroundColor: "#004d6f" }}
            >
              <Menu.Item key='1'>
                <HomeFilled />
                <span>Home</span>
              </Menu.Item>
              <Menu.Item key='2'>
                <UserOutlined />
                <span>Case Management</span>
              </Menu.Item>
              <SubMenu
                key='3'
                title={
                  <span>
                    <AppstoreFilled />
                    <span>Job Management</span>
                  </span>
                }
              >
                <Menu.Item key='4'>
                  <Link to='/open-jobs'>
                    <PlayCircleFilled />
                    <span>Open Jobs</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key='5'>
                  <Link to='/archived-jobs'>
                    <PauseCircleFilled />
                    <span>Jobs Archive</span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key='5' className='logout-menu' onClick={handleLogout}>
                <Link to='/'>
                  <LogoutOutlined />
                  <span>test1</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout
            className='site-layout'
            style={{ marginLeft: state.collapsed ? 80 : 200 }}
          >
            <Header
              className='site-layout-background'
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 0,
                paddingBottom: 0,
              }}
            >
              {React.createElement(
                state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setState({ collapsed: !state.collapsed }),
                },
              )}
            </Header>
            <Content
              className='site-layout-background'
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              <Route exact path='/open-jobs' component={OpenJobs}></Route>
            </Content>
          </Layout>
        </Layout>
      </>
    </Router>
  );
};

export default AppRouter;
