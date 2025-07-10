import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Popconfirm, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrgList, createOrg, updateOrg, deleteOrg, setSelectedOrg, clearError } from '../../../models/subAccountOrg';

const SubAccountOrg = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const { orgList, loading: tableLoading, error, pagination } = useSelector(state => state.subAccountOrg);
  
  useEffect(() => {
    loadData();
  }, []);
  
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);
  
  const loadData = async () => {
    setLoading(true);
    try {
      await dispatch(fetchOrgList({
        page: pagination.current - 1,
        size: pagination.pageSize,
      })).unwrap();
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAdd = () => {
    setEditingOrg(null);
    form.resetFields();
    setModalVisible(true);
  };
  
  const handleEdit = (record) => {
    setEditingOrg(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };
  
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteOrg(id)).unwrap();
      message.success('删除成功');
      loadData();
    } catch (error) {
      console.error('删除失败:', error);
    }
  };
  
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      if (editingOrg) {
        await dispatch(updateOrg({ id: editingOrg.id, data: values })).unwrap();
        message.success('更新成功');
      } else {
        await dispatch(createOrg(values)).unwrap();
        message.success('创建成功');
      }
      
      setModalVisible(false);
      loadData();
    } catch (error) {
      console.error('操作失败:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingOrg(null);
    form.resetFields();
  };
  
  const handleTableChange = (paginationInfo) => {
    dispatch(setPagination({
      current: paginationInfo.current,
      pageSize: paginationInfo.pageSize,
    }));
    loadData();
  };
  
  const columns = [
    {
      title: '组织名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '组织代码',
      dataIndex: 'code',
      key: 'code',
      width: 150,
    },
    {
      title: '联系人',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
      width: 120,
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
      key: 'contactPhone',
      width: 150,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <span style={{ color: status === 'active' ? '#52c41a' : '#ff4d4f' }}>
          {status === 'active' ? '启用' : '禁用'}
        </span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
      render: (time) => new Date(time).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个组织吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  // 模拟数据
  const mockData = [
    {
      id: '1',
      name: '供应商A公司',
      code: 'SUP001',
      contactPerson: '张三',
      contactPhone: '13800138001',
      email: 'zhangsan@supplier.com',
      address: '北京市朝阳区xxx街道xxx号',
      status: 'active',
      createTime: '2024-01-01 10:00:00',
    },
    {
      id: '2',
      name: '供应商B公司',
      code: 'SUP002',
      contactPerson: '李四',
      contactPhone: '13800138002',
      email: 'lisi@supplier.com',
      address: '上海市浦东新区xxx路xxx号',
      status: 'active',
      createTime: '2024-01-02 14:30:00',
    },
  ];
  
  return (
    <Card title="组织管理" extra={
      <Space>
        <Button
          icon={<ReloadOutlined />}
          onClick={loadData}
          loading={loading}
        >
          刷新
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          新增组织
        </Button>
      </Space>
    }>
      <Table
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        loading={tableLoading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
        }}
        onChange={handleTableChange}
        scroll={{ x: 1200 }}
      />
      
      <Modal
        title={editingOrg ? '编辑组织' : '新增组织'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={loading}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="组织名称"
            rules={[{ required: true, message: '请输入组织名称' }]}
          >
            <Input placeholder="请输入组织名称" />
          </Form.Item>
          
          <Form.Item
            name="code"
            label="组织代码"
            rules={[{ required: true, message: '请输入组织代码' }]}
          >
            <Input placeholder="请输入组织代码" />
          </Form.Item>
          
          <Form.Item
            name="contactPerson"
            label="联系人"
            rules={[{ required: true, message: '请输入联系人' }]}
          >
            <Input placeholder="请输入联系人" />
          </Form.Item>
          
          <Form.Item
            name="contactPhone"
            label="联系电话"
            rules={[
              { required: true, message: '请输入联系电话' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
            ]}
          >
            <Input placeholder="请输入联系电话" />
          </Form.Item>
          
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
          
          <Form.Item
            name="address"
            label="地址"
            rules={[{ required: true, message: '请输入地址' }]}
          >
            <Input.TextArea rows={3} placeholder="请输入地址" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default SubAccountOrg; 