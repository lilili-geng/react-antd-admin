import { fetchGetByUserId } from '@/api';
import { User, UserListFormModalProps, fetchGetByUser } from '@/types';
import { Modal, Form, Input } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

const UserListFormModal = forwardRef<any, UserListFormModalProps>(({ onCancel, onOk }, ref) => {

  const [form] = Form.useForm();

  const [visible, setVisible] = useState<boolean>(false);

  const [formId, setformId] = useState<number>(0)

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      if (formId != 0) {
        values.id = formId
      }
      onOk(values);
    } catch (error) {
      console.log('Validate Failed:', error);
    }
  };

  const fetchData = async (id: number) => {
    setformId(id)
    console.log(formId, "formId");
    try {
      const res: fetchGetByUser = await fetchGetByUserId(id);
      form.setFieldsValue({
        userName: res.data.userName,
        passWord: res.data.passWord,
        phone: res.data.phone,
        email: res.data.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useImperativeHandle(ref, () => ({
    form,
    setVisible,
    fetchData
  }));

  return (
    <Modal
      open={visible}
      title={formId ? '修改' : '新增'}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item<User>
          name="userName"
          label="userName"
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<User>
          name="passWord"
          label="passWord"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<User>
          name="phone"
          label="phone"
          rules={[
            { required: true, message: '手机号不能为空' },
            {
              pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
              message: '请输入正确的手机号'
            }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<User>
          name="email"
          label="email"
          rules={[
            { required: true, message: '邮箱不能为空' },
            { type: 'email', message: '请输入有效的邮箱地址' },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default UserListFormModal;
