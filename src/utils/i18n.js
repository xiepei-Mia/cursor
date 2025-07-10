import { locales } from '../locales';

/**
 * 获取指定语言的翻译文本
 * @param {string} locale - 语言代码 (zh_CN, en_US)
 * @param {string} key - 翻译键
 * @param {object} params - 参数对象，用于替换占位符
 * @returns {string} 翻译后的文本
 */
export const t = (locale, key, params = {}) => {
  const messages = locales[locale] || locales.zh_CN;
  let text = messages[key] || key;
  
  // 替换参数占位符
  Object.keys(params).forEach(paramKey => {
    const placeholder = `{${paramKey}}`;
    text = text.replace(new RegExp(placeholder, 'g'), params[paramKey]);
  });
  
  return text;
};

/**
 * 创建翻译函数
 * @param {string} locale - 语言代码
 * @returns {function} 翻译函数
 */
export const createT = (locale) => {
  return (key, params = {}) => t(locale, key, params);
};

/**
 * 获取所有支持的语言
 * @returns {object} 语言配置对象
 */
export const getSupportedLocales = () => {
  return {
    zh_CN: {
      code: 'zh_CN',
      name: '中文',
      flag: '🇨🇳',
    },
    en_US: {
      code: 'en_US',
      name: 'English',
      flag: '🇺🇸',
    },
  };
};

/**
 * 获取语言包
 * @param {string} locale - 语言代码
 * @returns {object} 语言包对象
 */
export const getMessages = (locale) => {
  return locales[locale] || locales.zh_CN;
};

export default {
  t,
  createT,
  getSupportedLocales,
  getMessages,
}; 