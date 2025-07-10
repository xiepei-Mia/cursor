import React from 'react';
import { Card, Form, Input, Button, Row, Col, Select, DatePicker } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const SupplierBasic = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('提交的值:', values);
  };

  return (
    <Card title="供应商基本信息">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: 'active',
          type: 'manufacturer',
        }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="供应商名称"
              rules={[{ required: true, message: '请输入供应商名称' }]}
            >
              <Input placeholder="请输入供应商名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="code"
              label="供应商代码"
              rules={[{ required: true, message: '请输入供应商代码' }]}
            >
              <Input placeholder="请输入供应商代码" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="type"
              label="供应商类型"
              rules={[{ required: true, message: '请选择供应商类型' }]}
            >
              <Select placeholder="请选择供应商类型">
                <Option value="manufacturer">制造商</Option>
                <Option value="distributor">经销商</Option>
                <Option value="service">服务商</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label="状态"
              rules={[{ required: true, message: '请选择状态' }]}
            >
              <Select placeholder="请选择状态">
                <Option value="active">启用</Option>
                <Option value="inactive">禁用</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="contactPerson"
              label="联系人"
              rules={[{ required: true, message: '请输入联系人' }]}
            >
              <Input placeholder="请输入联系人" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="contactPhone"
              label="联系电话"
              rules={[{ required: true, message: '请输入联系电话' }]}
            >
              <Input placeholder="请输入联系电话" />
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
              name="website"
              label="网站"
            >
              <Input placeholder="请输入网站地址" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="address"
              label="地址"
              rules={[{ required: true, message: '请输入地址' }]}
            >
              <TextArea rows={3} placeholder="请输入详细地址" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="businessLicense"
              label="营业执照号"
            >
              <Input placeholder="请输入营业执照号" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="taxNumber"
              label="税务登记号"
            >
              <Input placeholder="请输入税务登记号" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="establishDate"
              label="成立日期"
            >
              <DatePicker style={{ width: '100%' }} placeholder="请选择成立日期" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="registeredCapital"
              label="注册资本"
            >
              <Input placeholder="请输入注册资本" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="公司简介"
            >
              <TextArea rows={4} placeholder="请输入公司简介" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button style={{ marginLeft: 8 }}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SupplierBasic; 