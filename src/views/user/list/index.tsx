import { Button, Card, Form, Input, Space, Switch, Table, TableProps } from 'antd';
import { GetByUserListRequest, GetByUserListResponse, SpecificApiResponse, User } from '@/types/user';
import { fetchGetByUserList } from '@/api';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const List = () => {


  const [UserListParams, setUserListParams] = useState<GetByUserListRequest>({
    page: 1,
    pageSize: 10,
    email: "",
    userName: ""
  })

  const [UserList, setUserList] = useState<User[] | undefined>()


  const CardForm = () => {
    return (
      <div className='h-fit'>
        <Card>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout='inline'
          >
            <Form.Item<GetByUserListRequest>
              label="用户名"
              name="userName"
            >
              <Input />
            </Form.Item>

            <Form.Item<GetByUserListRequest>
              label="邮箱"
              name="email"
              rules={[
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Form>
        </Card >
      </div>

    );
  }

  const UserListTable = () => {
    const columns: TableProps<User>['columns'] = [
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        render: (text) => <a>{text}</a>,
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '邮箱地址',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '登陆时间',
        dataIndex: 'loginAt',
        key: 'loginAt',
        render: (text) => text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-',
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text) => text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-',
      },
      {
        title: '修改时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (text) => text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-',
      },
      {
        title: '是否注销',
        dataIndex: 'isLogOut',
        key: 'isLogOut',
        render: (text) => {
          return (
            <div>
              <Switch
                defaultChecked={text == 0}
              // onChange={(checked) => handleSwitchChange(checked, record.id)}
              />
            </div>
          )
        }
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a className='text-li-colorBlue'>查看</a>
            <a className='text-red-500'>删除</a>
          </Space>
        ),
      },
    ];

    return (
      <Table bordered columns={columns} dataSource={UserList} rowKey="id" />
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: SpecificApiResponse = await fetchGetByUserList(UserListParams);
        console.log(res);
        setUserList(res.data.list)

        console.log(UserList, "user");
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [UserListParams]);


  const onFinish = (values: GetByUserListRequest) => {
    // 更新状态
    setUserListParams({
      ...UserListParams,
      ...values,
    });
  };


  return (
    <div className='text-li-color p-2 bg-li-fitbg w-full h-full flex flex-col'>
      <div className='w-full h-full flex flex-col'>
        {CardForm()}
        <Card className='mt-2 flex-1'>
          <UserListTable />
        </Card>
      </div>
    </div>
  );
};

export default List;
