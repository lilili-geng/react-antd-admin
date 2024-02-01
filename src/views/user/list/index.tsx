import { Button, Card, Form, Input, Pagination, PaginationProps, Space, Switch, Table, TableProps, message } from 'antd';
import { GetByUserListRequest, SpecificApiResponse, UserById, User } from '@/types/user';
import { fetchDeleteByUserId, fetchGetByUserList, fetchRegister, fetchUpdateByUser } from '@/api';
import { useEffect, useMemo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import UserListFormModal from './UserListFormModal';

const List = () => {

  const [UserListParams, setUserListParams] = useState<GetByUserListRequest>({
    page: 1,
    pageSize: 7,
    email: "",
    userName: ""
  })

  const [UserList, setUserList] = useState<User[] | undefined>()

  const [total, setTotal] = useState(0);


  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);


  const [loading, setLoading] = useState(false);

  const userListFormModalRef = useRef<any>(); // 使用 React.RefObject<any> 类型


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
            <Button
              type="link"
              onClick={() => updateAndAdd(record.id)}
            >
              修改
            </Button>
          </Space >
        ),
      },
    ];

    return (
      <div >
        <Table bordered rowKey={row => row.id} rowSelection={rowSelection} columns={columns} dataSource={UserList} pagination={false} />
        <Pagination className='flex justify-end  mt-2' current={UserListParams.page} pageSize={UserListParams.pageSize} total={total} onChange={onChange} />
      </div>
    )
  }

  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setUserListParams((prevParams) => ({
      ...prevParams,
      page,
    }));
  };

  useEffect(() => {
    fetchData(UserListParams);
  }, [UserListParams]);


  const fetchData = async (values: GetByUserListRequest) => {
    try {
      const res: SpecificApiResponse = await fetchGetByUserList(values);
      setUserList(res.data.list);
      setTotal(res.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = (values: GetByUserListRequest) => {
    setUserListParams((prevParams) => ({
      ...prevParams,
      ...values,
    }));
  };


  const rowSelection = {
    selectedRowKeys,
    onChange: (key: React.Key[]) => {
      setSelectedRowKeys(key);
    },
  };

  const hasSelected = selectedRowKeys.length > 0;

  const deleteUserById = async () => {
    setLoading(true);
    try {
      if (UserList && selectedRowKeys.length > 0) {
        const selectedRowKeysAsNumbers = selectedRowKeys.map((key) => Number(key));
        const res = await fetchDeleteByUserId(selectedRowKeysAsNumbers);
        message.success("delete " + res.message)
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // 无论成功或失败都会执行的代码
      setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
        fetchData(UserListParams)
      }, 1000);
    }
  };

  const handleOk = async (values: any) => {
    try {
      if (values.id) {
        const res: UserById = await fetchUpdateByUser(values);
        message.success("update " + res.message);
      } else {
        const res: UserById = await fetchRegister(values);
        message.success("addUser " + res.message);
      }
      userListFormModalRef.current.setVisible(false);
    } catch (error) {
      console.error('handleOk:', error);
    } finally {
      fetchData(UserListParams)
    }
  };

  const updateAndAdd = (id?: number | null) => {
    userListFormModalRef.current.fetchData(id);
    userListFormModalRef.current.form.resetFields()
    userListFormModalRef.current.setVisible(true);
  }


  return (
    <div className='text-li-color p-2 bg-li-fitbg w-full h-full flex flex-col'>
      <div className='w-full h-full flex flex-col'>
        {CardForm()}
        <Card className='mt-2 flex-1'>
          <div className='flex justify-start mb-2'>
            <Button type="primary" className='mr-2' onClick={() => { updateAndAdd(0) }}>
              新增
            </Button>
            <Button danger onClick={deleteUserById} disabled={!hasSelected} loading={loading}>
              删除
            </Button>
          </div>
          <UserListTable />
        </Card>
      </div>
      <UserListFormModal ref={userListFormModalRef} onCancel={() => { userListFormModalRef.current.setVisible(false) }} onOk={handleOk} />
    </div>
  );
};

export default List;
