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

        {/* 添加更多字段来测试滚动效果 */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="industry"
              label="所属行业"
            >
              <Select placeholder="请选择所属行业">
                <Option value="manufacturing">制造业</Option>
                <Option value="electronics">电子行业</Option>
                <Option value="automotive">汽车行业</Option>
                <Option value="chemical">化工行业</Option>
                <Option value="textile">纺织行业</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="scale"
              label="企业规模"
            >
              <Select placeholder="请选择企业规模">
                <Option value="small">小型企业</Option>
                <Option value="medium">中型企业</Option>
                <Option value="large">大型企业</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="employeeCount"
              label="员工人数"
            >
              <Input placeholder="请输入员工人数" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="annualRevenue"
              label="年营业额"
            >
              <Input placeholder="请输入年营业额" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="certification"
              label="认证情况"
            >
              <Select mode="multiple" placeholder="请选择认证情况">
                <Option value="iso9001">ISO 9001</Option>
                <Option value="iso14001">ISO 14001</Option>
                <Option value="ohsas18001">OHSAS 18001</Option>
                <Option value="ts16949">TS 16949</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="bankName"
              label="开户银行"
            >
              <Input placeholder="请输入开户银行" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="bankAccount"
              label="银行账号"
            >
              <Input placeholder="请输入银行账号" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="creditRating"
              label="信用等级"
            >
              <Select placeholder="请选择信用等级">
                <Option value="aaa">AAA</Option>
                <Option value="aa">AA</Option>
                <Option value="a">A</Option>
                <Option value="bbb">BBB</Option>
                <Option value="bb">BB</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="businessScope"
              label="经营范围"
            >
              <TextArea rows={3} placeholder="请输入经营范围" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="legalRepresentative"
              label="法定代表人"
            >
              <Input placeholder="请输入法定代表人" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="legalPhone"
              label="法人电话"
            >
              <Input placeholder="请输入法人电话" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="financeContact"
              label="财务联系人"
            >
              <Input placeholder="请输入财务联系人" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="financePhone"
              label="财务电话"
            >
              <Input placeholder="请输入财务电话" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="remark"
              label="备注"
            >
              <TextArea rows={4} placeholder="请输入备注信息" />
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