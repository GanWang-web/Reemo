import { Layout, Menu } from 'antd';
import {useSelector,useDispatch} from "react-redux"
import { UserOutlined,LoginOutlined,HomeOutlined,UserAddOutlined   } from '@ant-design/icons';

import {Link} from "react-router-dom"
import { Auth } from 'aws-amplify';
import {Button} from "antd"
import { PoweroffOutlined  } from '@ant-design/icons';


const { Header } = Layout;


export default function Nav() {
  const dispatch = useDispatch()
  const currentUser = useSelector(({currentUser})=>currentUser)
  console.log(currentUser);
  // async function signOut(){
  //   try {
  //       await Auth.signOut({global:true});
  //       dispatch({type:"setUsername",payload:""})
  //       history.push("/")
  //   } catch (error) {
  //       console.log('error signing out: ', error);
  //   }
  // }

  async function handleSignout(){
    try {
      await Auth.signOut({ global: true });
      dispatch({type:"setCurrentUser",payload:""})
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  if(currentUser===''||currentUser===undefined||currentUser===null){
    return (
      <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu selectable={false} theme="dark" mode="horizontal"  key="sub1" title="photos">
                <Link to="/"><Button style={{marginTop:"15px",marginLeft:"15px"}}
                    type="primary"
                    icon={<HomeOutlined />} key="1">Homapage</Button></Link>
                <Link to="/signin"><Button style={{marginTop:"15px",marginLeft:"15px"}}
                    type="primary"
                    icon={<LoginOutlined  />} key="2">Log in</Button></Link>
                <Link to="/signup"><Button style={{marginTop:"15px",marginLeft:"15px"}}
                    type="primary"
                    icon={<UserAddOutlined  />} key="3">Sign up</Button></Link>
              </Menu>
        </Header>
    </Layout>
    )
  } else {
    return (
      <Layout>
      <Header className="header">
        <div className="logo" />
          <Menu selectable={false} theme="dark" mode="horizontal"  key="sub1" title="photos">
            <Menu.Item>
              <UserOutlined/>{currentUser.username}
            </Menu.Item>
                <Button
                style={{marginTop:"15px",marginLeft:"15px"}}
                    type="primary"
                    icon={<PoweroffOutlined />}
                    // loading={loadings[2]}
                    // onClick={() => this.enterLoading(2)}
                    onClick={handleSignout}
                  >Sign out</Button>
              </Menu>
        </Header>
    </Layout>
    )
  }
}
