import React from 'react';
import { Card, Form, Input, Button, Row, Col, Select, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import { createT } from '../../../utils/i18n';

const { Option } = Select;
const { TextArea } = Input;

const SupplierBasic = () => {
  const [form] = Form.useForm();
  const { locale } = useSelector(state => state.locale);
  const t = createT(locale);

  const onFinish = (values) => {
    console.log('提交的值:', values);
  };

  return (
    <Card title={t('page.basic.title')}>
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
              label={t('form.supplier.name')}
              rules={[{ required: true, message: `请输入${t('form.supplier.name')}` }]}
            >
              <Input placeholder={`请输入${t('form.supplier.name')}`} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="code"
              label={t('form.supplier.code')}
              rules={[{ required: true, message: `请输入${t('form.supplier.code')}` }]}
            >
              <Input placeholder={`请输入${t('form.supplier.code')}`} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="type"
              label={t('form.supplier.type')}
              rules={[{ required: true, message: `请选择${t('form.supplier.type')}` }]}
            >
              <Select placeholder={`请选择${t('form.supplier.type')}`}>
                <Option value="manufacturer">{t('option.manufacturer')}</Option>
                <Option value="distributor">{t('option.distributor')}</Option>
                <Option value="service">{t('option.service')}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label={t('form.supplier.status')}
              rules={[{ required: true, message: `请选择${t('form.supplier.status')}` }]}
            >
              <Select placeholder={`请选择${t('form.supplier.status')}`}>
                <Option value="active">{t('option.active')}</Option>
                <Option value="inactive">{t('option.inactive')}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="contactPerson"
              label={t('form.supplier.contactPerson')}
              rules={[{ required: true, message: `请输入${t('form.supplier.contactPerson')}` }]}
            >
              <Input placeholder={`请输入${t('form.supplier.contactPerson')}`} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="contactPhone"
              label={t('form.supplier.contactPhone')}
              rules={[{ required: true, message: `请输入${t('form.supplier.contactPhone')}` }]}
            >
              <Input placeholder={`请输入${t('form.supplier.contactPhone')}`} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="email"
              label={t('form.supplier.email')}
              rules={[
                { required: true, message: `请输入${t('form.supplier.email')}` },
                { type: 'email', message: '请输入正确的邮箱格式' }
              ]}
            >
              <Input placeholder={`请输入${t('form.supplier.email')}`} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="website"
              label={t('form.supplier.website')}
            >
              <Input placeholder={`请输入${t('form.supplier.website')}`} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="address"
              label={t('form.supplier.address')}
              rules={[{ required: true, message: `请输入${t('form.supplier.address')}` }]}
            >
              <TextArea rows={3} placeholder={`请输入${t('form.supplier.address')}`} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="businessLicense"
              label={t('form.supplier.businessLicense')}
            >
              <Input placeholder={`请输入${t('form.supplier.businessLicense')}`} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="taxNumber"
              label={t('form.supplier.taxNumber')}
            >
              <Input placeholder={`请输入${t('form.supplier.taxNumber')}`} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="establishDate"
              label={t('form.supplier.establishDate')}
            >
              <DatePicker style={{ width: '100%' }} placeholder={`请选择${t('form.supplier.establishDate')}`} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="registeredCapital"
              label={t('form.supplier.registeredCapital')}
            >
              <Input placeholder={`请输入${t('form.supplier.registeredCapital')}`} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="description"
              label={t('form.supplier.description')}
            >
              <TextArea rows={4} placeholder={`请输入${t('form.supplier.description')}`} />
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
                <Option value="small">{t('option.small')}</Option>
                <Option value="medium">{t('option.medium')}</Option>
                <Option value="large">{t('option.large')}</Option>
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
            {t('app.save')}
          </Button>
          <Button style={{ marginLeft: 8 }}>
            {t('app.reset')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SupplierBasic; 