import React from 'react';
import { Modal, Form, Radio, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setLocale } from '../../models/locale';
import { getSupportedLocales, createT } from '../../utils/i18n';

const LanguageSettings = ({ visible, onCancel }) => {
  const dispatch = useDispatch();
  const { locale } = useSelector(state => state.locale);
  const t = createT(locale);
  
  const handleLocaleChange = (value) => {
    dispatch(setLocale(value));
  };
  
  const supportedLocales = getSupportedLocales();
  const languages = Object.values(supportedLocales);
  
  return (
    <Modal
      title={t('user.language')}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={400}
    >
      <Form layout="vertical">
        <Form.Item label={t('user.language')}>
          <Radio.Group value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
            <Space direction="vertical">
              {languages.map(lang => (
                <Radio key={lang.code} value={lang.code}>
                  <Space>
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </Space>
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LanguageSettings; 