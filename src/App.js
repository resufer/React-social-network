import React from 'react';
import style from './App.module.css';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import itsMe from './utils/itsMe/itsMe';
import MessagesContainer from './components/Messages/messagesContainer';
import { UsersContainer } from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound'
import { initializeApp } from './redux/app-reducer';
import { logout } from './redux/auth-reducer';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import defaultPhoto from './assets/img/icon.png';
import { Layout, Menu, Button, Row, Col, Space } from 'antd';
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const { SubMenu } = Menu;

const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) return <Preloader />
    const { collapsed } = this.state;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          {itsMe() && this.props.isAuth &&
            <Row>
              <Col span={6}>
                <div className={style.login}>
                  {this.props.fullName}
                </div>
              </Col>
              <Col span={4} offset={14}>
                {this.props.isAuth ?
                  <div className={style.logout}>
                    <Space>
                      <Button onClick={this.props.logout} type='primary'>Log out</Button>
                      <img src={this.props.photo || defaultPhoto} alt='loginPhoto' />
                    </Space>
                  </div> :
                  <Link to={'/login'}>Login</Link>}
              </Col>
            </Row>
          }
        </Header>

        <Content style={{ padding: '0 50px' }}>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}>
                <SubMenu key="sub1" icon={<UserOutlined />} title="Main">
                  <Menu.Item key="1">
                    <Link to='/profile'>Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to='/messages'>Messages</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to='/users'>Users</Link>
                    {this.props.totalUsersCount === 0 ?
                      <span></span> :
                      <span className={style.usersCount}>{this.props.totalUsersCount}</span>
                    }
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Side">
                  <Menu.Item key="4">
                    <Link to='/news'>News</Link>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Link to='/music'>Music</Link>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Link to='/settings'>Settings</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
                <Route path='/messages' render={() => <MessagesContainer />} />
                <Route path='/news' render={() => { return <React.Suspense fallback={<Preloader />}><News /></React.Suspense> }} />
                <Route path='/music' render={() => { return <React.Suspense fallback={<Preloader />}><Music /></React.Suspense> }} />
                <Route path='/users' render={() => <UsersContainer />} />
                <Route path='/settings' render={() => { return <React.Suspense fallback={<Preloader />}><Settings /></React.Suspense> }} />
                <Route path='/login' render={() => <Login />} />
                <Redirect exact from="/" to="/profile" />
                <Route path='*' render={() => <NotFound />} />
              </Switch>
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

let mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth,
  photo: state.profilePage.profile.photos && state.profilePage.profile.photos.small,
  totalUsersCount: state.usersPage.totalUsersCount,
  fullName: state.profilePage.profile.fullName
})

export default connect(mapStateToProps, { initializeApp, logout })(App);
