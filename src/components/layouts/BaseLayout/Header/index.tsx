import "./index.less"
import SlideLogo from "@/assets/image/login/logo.svg"
import UserDefalutIcon from "@/components/layouts/image/user-defalut-icon.png"
import { MenuProps, Select } from 'antd';
import { Dropdown } from 'antd';
import { FullscreenExitOutlined, FullscreenOutlined, SwapRightOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useUserProvider } from '@/provider/modules/user';
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next'
import { useLayoutProvider } from "@/provider/modules/layout";


// 暂时没有传参 后期要修改把any替换成正确类型
export const Headers = (props: any) => {

  const { logout } = useUserProvider();

  const { fullscreen, toggleFullscreen, currentMode } = useLayoutProvider();


  let { i18n } = useTranslation()


  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div onClick={() => { logout(); navigate("/login") }}>
          <SwapRightOutlined /> <span>退出登陆</span>
        </div>
      ),
    },
  ];

  const i18nItem = [
    {
      key: '1',
      label: (
        <div onClick={() => { i18n.changeLanguage('enUs'); }}>
          <SwapRightOutlined /> <span>English</span>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={() => { i18n.changeLanguage('zhCn'); }}>
          <SwapRightOutlined /> <span>简体中文</span>
        </div>
      ),
    },
  ];

  return (
    <header className="li-header bg-li-bg border-b-1 border-li-border-color">
      <div className="li-header-left">
        <img src={SlideLogo} alt="" />
        <div className="text-li-color">
          admin后台管理
        </div>
      </div>
      <div className="li-header-right">
        <div className="search-menu">
          {/* <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[
              {
                value: 'jack',
                label: 'Jack',
              },
              {
                value: 'lucy',
                label: 'Lucy',
              },
              {
                value: 'tom',
                label: 'Tom',
              },
            ]}
          /> */}
        </div>
        {
          !fullscreen ?
            <FullscreenOutlined className="text-li-color" onClick={() => { toggleFullscreen() }} />
            :
            <FullscreenExitOutlined className="text-li-color" onClick={() => { toggleFullscreen() }} />
        }
        <Dropdown menu={{ items: i18nItem }}>
          <div className="flex items-center ml-[25px] cursor-pointer">
            <div className="flex flex-col">
              <UnorderedListOutlined className="text-li-color" />
            </div>
          </div>
        </Dropdown>

        <Dropdown menu={{ items }}>
          <div className="flex items-center ml-[25px] cursor-pointer">
            <img
              className=" rounded-[50%] bg-[#bfdedc] mr-[8px]"
              src={UserDefalutIcon}
              alt=""
            />
            <div className="flex flex-col">
              <span className='text-lg font-[400] text-li-color'>Admin</span>
              <span className="text-sm font-[400] text-[#999999]">超级管理员</span>
            </div>
          </div>
        </Dropdown>
      </div>
    </header>
  );
}

