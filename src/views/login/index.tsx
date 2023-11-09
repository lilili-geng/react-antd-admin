import logo from '@/assets/image/login/logo.svg'
import question from '@/assets/image/login/question.png'
import { LoginParams } from '@/types/login';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Tabs, message } from 'antd';
import { useState } from 'react';
import { useLoginHooks } from "@/hooks/login"
import { useNavigate } from "react-router";
export default function Login() {

  const [loading, setLoading] = useState<boolean>(false)

  const { login } = useLoginHooks()

  const navigate = useNavigate()


  const formTabs = () => [
    {
      key: '1',
      label: '账号密码登陆',
      children: (
        <Form
          className='w-[100%]'
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<LoginParams>
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined className="text-[#689ffb]" />} placeholder='账户名 / 手机号 / 邮箱' />
          </Form.Item>

          <Form.Item<LoginParams>
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined className="text-[#689ffb]" />} placeholder='密码' />
          </Form.Item>
          <div className="flex justify-between items-baseline">
            <Form.Item<LoginParams>
              name="showPwd"
              valuePropName="checked"
              className='h-[100%]'
            >
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
            <div className='flex items-center'>
              <div>忘记密码</div>
              <img src={question} className='w-[20px] h-[20px] ml-2' />
            </div>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];


  // 默认情况不登陆 有后台可以放开注释
  const onFinish = async (values: LoginParams) => {
    setLoading(true)
    navigate("/")
    try {
      // login(values)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      message.error(error)
    }
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-[url(@/assets/image/login/login_bg.jpg)] bg-cover bg-center bg-no-repeat relative pt-24 flex justify-center">
      <div className='flex flex-col'>
        <div className="w-[368px]">
          <div className="flex items-center">
            <img src={logo} className="w-[94px] h-[57px] mb-[20px] mr-5"></img>
            <span className="w-[200px] h-[35px] opacity-100 text-[22px] font-bold mb-5">react后台管理框架</span>
          </div>
        </div>
        <div >
          <Tabs defaultActiveKey="1" items={formTabs()} onChange={onChange} />
        </div>


      </div>
    </div>
  );
}
