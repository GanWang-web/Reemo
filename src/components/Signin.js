import React from 'react';
import  { Auth } from 'aws-amplify';
import {useHistory} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

const Signin = () => {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };


  const history = useHistory();
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //     return onAuthUIStateChange((nextAuthState, authData) => {
  //         setAuthState(nextAuthState);
  //         setUser(authData)
  //         if(nextAuthState === "resettingpassword"){
  //           dispatch({type:"setCurrentUser",payload:{...authData}})
  //           history.push("/")
  //         }
  //     });
  // }, []);
  async function onFinish(values: any){
    const {username,password} = values
    try{
      const user = await Auth.signIn({
        username:username,
        password:password,
      })

      dispatch({type:"setCurrentUser",payload:{currentUser:{...user}}})
      history.push("/")
    } catch(err){
      console.log(err);
    }
  };
  return (
    <Form
    style={{marginTop:"150px"}}
    {...formItemLayout}
    form={form}
    name="register"
    onFinish={onFinish}
    initialValues={{
      residence: ['zhejiang', 'hangzhou', 'xihu'],
      prefix: '86',
    }}
    scrollToFirstError
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="password"
      label="Password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
      hasFeedback
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="secondary" htmlType="submit">
        Confirm
      </Button>
    </Form.Item>
  </Form>
  
  )
}

export default Signin;