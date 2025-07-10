import React from 'react';
import { Card, Form, Input, Button, Row, Col, Select, Table, Space, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const SupplierContact = () => {
  const [form] = Form.useForm();

  const contactColumns = [
    {
      title: '联系人姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '固定电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '是否主要联系人',
      dataIndex: 'isPrimary',
      key: 'isPrimary',
      render: (isPrimary) => (
        <Tag color={isPrimary ? 'green' : 'default'}>
          {isPrimary ? '是' : '否'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="small">
          <Button type="link" icon={<EditOutlined />}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const mockContactData = [
    {
      id: 1,
      name: '张三',
      position: '采购经理',
      mobile: '13800138001',
      phone: '010-12345678',
      email: 'zhangsan@example.com',
      isPrimary: true,
    },
    {
      id: 2,
      name: '李四',
      position: '技术总监',
      mobile: '13800138002',
      phone: '010-12345679',
      email: 'lisi@example.com',
      isPrimary: false,
    },
  ];

  const onFinish = (values) => {
    console.log('提交的联系人信息:', values);
  };

  return (
    <div>
      <Card title="联系人信息" style={{ marginBottom: 16 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="name"
                label="联系人姓名"
                rules={[{ required: true, message: '请输入联系人姓名' }]}
              >
                <Input placeholder="请输入联系人姓名" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="position"
                label="职位"
                rules={[{ required: true, message: '请输入职位' }]}
              >
                <Input placeholder="请输入职位" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="department"
                label="部门"
              >
                <Input placeholder="请输入部门" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="mobile"
                label="手机号码"
                rules={[
                  { required: true, message: '请输入手机号码' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
                ]}
              >
                <Input placeholder="请输入手机号码" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="phone"
                label="固定电话"
              >
                <Input placeholder="请输入固定电话" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="fax"
                label="传真"
              >
                <Input placeholder="请输入传真号码" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入正确的邮箱格式' }
                ]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="isPrimary"
                label="是否主要联系人"
              >
                <Select placeholder="请选择">
                  <Option value={true}>是</Option>
                  <Option value={false}>否</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                name="remark"
                label="备注"
              >
                <Input.TextArea rows={3} placeholder="请输入备注信息" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              添加联系人
            </Button>
            <Button style={{ marginLeft: 8 }}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="联系人列表">
        <Table
          columns={contactColumns}
          dataSource={mockContactData}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default SupplierContact; 