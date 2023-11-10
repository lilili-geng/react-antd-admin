import { useTranslation } from 'react-i18next'

const Ceshi = () => {
  let { t, i18n } = useTranslation()


  const changelanguage = () => {
    const newLanguage = i18n.language === 'enUs' ? 'zhCn' : 'enUs';
    i18n.changeLanguage(newLanguage);
  }


  return (
    <div className='text-li-color'>
      <div>{t('home')}</div>
      <div>
        <button onClick={() => { changelanguage() }}>
          {i18n.language === 'enUs' ? 'enUs' : 'zhCn'}
        </button>
      </div>
    </div>
  );
};

export default Ceshi;
