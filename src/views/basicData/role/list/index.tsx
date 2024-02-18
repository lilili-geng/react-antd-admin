import { Button, Card, Form, Input, Pagination, PaginationProps, Select, Space, Switch, Table, TableProps, message } from 'antd';
import { GetByRoleListRequest, SpecificRoleApiResponse, UserById, User, Role } from '@/types';
import { fetchDeleteByUserId, fetchGetByRoleList, fetchRegister, fetchUpdateByUser } from '@/api';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import RoleListFormModal from './roleListFormModal';

const List = () => {

  const [RoleListParams, setRoleListParams] = useState<GetByRoleListRequest>({
    page: 1,
    pageSize: 7,
    roleName: "",
    roleStatus: ""
  })

  const [RoleList, setRoleList] = useState<Role[] | undefined>()

  const [total, setTotal] = useState(0);


  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);


  const [loading, setLoading] = useState(false);

  const roleListFormModalRef = useRef<any>(); // 使用 React.RefObject<any> 类型

  const [form] = Form.useForm(); // 创建表单实例

  const CardForm = () => {
    return (
      <div className='h-full'>
        <Card>
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout='inline'
          >
            <Form.Item<GetByRoleListRequest>
              label="权限字符"
              name="roleName"
            >
              <Input />
            </Form.Item>

            <Form.Item<GetByRoleListRequest>
              label="状态"
              name="roleStatus"
            >
              <Select
                style={{ width: 200, "textAlign": "left" }}
                options={[{ value: '0', label: '正常' }, { value: '1', label: '停用' },]}
                allowClear
                onChange={(value: string) => {
                  if (!value) {
                    setRoleListParams((prevParams) => ({
                      ...prevParams,
                      roleStatus: "",
                    }));
                  }
                }}
              />
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


  const RoleListTable = () => {
    const columns: TableProps<Role>['columns'] = [

      {
        title: '权限字符',
        dataIndex: 'roleName',
        key: 'roleName',
        render: (text) => <a>{text}</a>,
      },
      {
        title: '顺序',
        dataIndex: 'sort',
        key: 'sort',
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
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: (text) => <a>{text}</a>,
      },
      {
        title: '是否注销',
        dataIndex: 'roleStatus',
        key: 'roleStatus',
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
        <Table bordered rowKey={row => row.id} rowSelection={rowSelection} columns={columns} dataSource={RoleList} pagination={false} />
        <Pagination className='flex justify-end  mt-2' current={RoleListParams.page} pageSize={RoleListParams.pageSize} total={total} onChange={onChange} />
      </div>
    )
  }

  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setRoleListParams((prevParams) => ({
      ...prevParams,
      page,
    }));
  };

  useEffect(() => {
    fetchData(RoleListParams);
  }, [RoleListParams]);


  const fetchData = async (values: GetByRoleListRequest) => {
    try {
      const res: SpecificRoleApiResponse = await fetchGetByRoleList(values);
      console.log(res);
      setRoleList(res.data.list);
      setTotal(res.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = (values: GetByRoleListRequest) => {
    setRoleListParams((prevParams) => ({
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
      if (RoleList && selectedRowKeys.length > 0) {
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
        fetchData(RoleListParams)
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
      roleListFormModalRef.current.setVisible(false);
    } catch (error) {
      console.error('handleOk:', error);
    } finally {
      fetchData(RoleListParams)
    }
  };

  const updateAndAdd = (id?: number | null) => {
    roleListFormModalRef.current.fetchData(id);
    roleListFormModalRef.current.form.resetFields()
    roleListFormModalRef.current.setVisible(true);
  }


  return (
    <div className='text-li-color p-2  w-full h-full flex flex-col'>
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
          <RoleListTable />
        </Card>
      </div>
      <RoleListFormModal ref={roleListFormModalRef} onCancel={() => { roleListFormModalRef.current.setVisible(false) }} onOk={handleOk} />
    </div>
  );
};

export default List;
