import { Headers } from '@/components/layouts/BaseLayout/Header/index';
import { Siders } from '@/components/layouts/BaseLayout/Siders/index';
import { ConfigProvider, Layout, theme } from 'antd';
import "./index.less"
import { BaseLayoutProps } from '@/types/layout';
import { SidersWarp } from '@/components/layouts/BaseLayout/SidersWarp/index';
import { useLayoutProvider } from '@/provider/modules/layout';

const { Content } = Layout;

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {

  const { currentMode } = useLayoutProvider()

  return (
    <ConfigProvider theme={{
      algorithm: currentMode == 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
    }}>
      <div className="li-layout">
        <Headers />
        <div className="li-container">
          <div className="li-slide-body">
            <Siders />
            <SidersWarp />
          </div>
          <Layout>
            <Content
              className='bg-skin-bg'
            >
              <div className="text-center ">
                {children}
              </div>
            </Content>
          </Layout>
        </div>
      </div>
    </ConfigProvider>
  );
}

