import logo from '@/assets/image/login/logo.svg'
// import question from '@/assets/image/login/question.png'
import { LoginRequest } from '@/types/user';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Tabs, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from "react-router";
import { useUserProvider } from '@/provider/modules/user';


export default function Login() {

  const [loading, setLoading] = useState<boolean>(false);

  const { handleLogin } = useUserProvider();

  const navigate = useNavigate();


  const [form] = Form.useForm();

  const formTabs = () => [
    {
      key: '1',
      label: '账号密码登陆',
      children: (
        <Form
          className='w-[100%]'
          form={form} // 将 form 实例传递给 Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined className="text-[#689ffb]" />} placeholder='账户名 / 手机号 / 邮箱' />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined className="text-[#689ffb]" />} placeholder='密码' />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];



  const onFinish = async (values: LoginRequest) => {
    setLoading(true);
    try {
      await handleLogin(values);
      setLoading(false);
      navigate("/");
    } catch (error: any) {
      console.log(error, "error");
      setLoading(false);
      message.error(error.message);
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
            <img src={logo} className="w-[94px] h-[57px] mb-[20px] mr-5" alt="logo"></img>
            <span className="w-[200px] h-[35px] opacity-100 text-[22px] font-bold mb-5">li-Admin后台管理</span>
          </div>
        </div>
        <div>
          <Tabs defaultActiveKey="1" items={formTabs()} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
