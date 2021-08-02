import React from 'react';
import {Auth} from "aws-amplify"
import { Form, Input, Checkbox, Button } from 'antd';
import {useDispatch} from "react-redux"
import { useHistory } from 'react-router';

const Signup = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [user, setUser] = React.useState();
  const [form] = Form.useForm();
    

  async function onFinish(values: any){
    // console.log('Success:', values);
    const {username,password,email,ConfirmCode} = values
    if(ConfirmCode){
      Auth.confirmSignUp(username, ConfirmCode).then(()=>{
        console.log('Successfully confirmed signed up')
        dispatch({type:"setCurrentUser",payload:user})
        history.push("/")
      }).catch((err)=>{
        console.log(err);
      })
      return;
    }

    try{
      const user = await Auth.signUp({
        username:username,
        password:password,
        attributes:{
          email:email
        }
      })
      setUser({...user})
      dispatch({action:"setCurrentUser",payload:{...user}})
    } catch (err){
      console.log('error signing up',err);
    }
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // }

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

  return (
    <Form
    {...formItemLayout}
    style={{marginTop:"150px"}}
    form={form}
    name="register"
    onFinish={onFinish}
    // initialValues={{
    //   prefix: '86',
    // }}
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
      name="email"
      label="E-mail"
      rules={[
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please input your E-mail!',
        },
      ]}
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

    <Form.Item
      name="confirm"
      label="Confirm Password"
      dependencies={['password']}
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
          },
        }),
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
    {
      user?(
        <>
          <Form.Item
            label="ConfirmCode"
            name="ConfirmCode"
            rules={[{ required: true, message: 'Please input your confirm code!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="secondary" htmlType="submit">
              Confirm
            </Button>
          </Form.Item>
        </>
      ):(null)
    }
  </Form>
  )
}
export default Signup;