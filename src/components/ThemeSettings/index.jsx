import React from 'react';
import { Modal, Form, Select, Switch, Slider, ColorPicker, Space, Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme, setPrimaryColor, setBorderRadius, setCompact } from '../../models/theme';
import { createT } from '../../utils/i18n';

const { Option } = Select;

const ThemeSettings = ({ visible, onCancel }) => {
  const dispatch = useDispatch();
  const { theme, primaryColor, borderRadius, compact } = useSelector(state => state.theme);
  const { locale } = useSelector(state => state.locale);
  const t = createT(locale);
  
  const handleThemeChange = (value) => {
    dispatch(setTheme(value));
  };
  
  const handlePrimaryColorChange = (color) => {
    dispatch(setPrimaryColor(color.toHexString()));
  };
  
  const handleBorderRadiusChange = (value) => {
    dispatch(setBorderRadius(value));
  };
  
  const handleCompactChange = (checked) => {
    dispatch(setCompact(checked));
  };
  
  return (
    <Modal
      title={t('user.theme')}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={500}
    >
      <Form layout="vertical">
        <Form.Item label={t('theme.light')}>
          <Select value={theme} onChange={handleThemeChange}>
            <Option value="light">{t('theme.light')}</Option>
            <Option value="dark">{t('theme.dark')}</Option>
            <Option value="auto">{t('theme.auto')}</Option>
          </Select>
        </Form.Item>
        
        <Divider />
        
        <Form.Item label={t('theme.primaryColor')}>
          <ColorPicker
            value={primaryColor}
            onChange={handlePrimaryColorChange}
            showText
            presets={[
              {
                label: '推荐',
                colors: [
                  '#1890ff',
                  '#52c41a',
                  '#faad14',
                  '#f5222d',
                  '#722ed1',
                  '#13c2c2',
                ],
              },
            ]}
          />
        </Form.Item>
        
        <Form.Item label={t('theme.borderRadius')}>
          <Slider
            min={0}
            max={16}
            value={borderRadius}
            onChange={handleBorderRadiusChange}
            marks={{
              0: '0px',
              4: '4px',
              8: '8px',
              12: '12px',
              16: '16px',
            }}
          />
        </Form.Item>
        
        <Form.Item label={t('theme.compact')}>
          <Switch checked={compact} onChange={handleCompactChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ThemeSettings; 