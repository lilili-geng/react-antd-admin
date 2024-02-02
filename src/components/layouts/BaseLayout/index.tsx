import { Headers } from '@/components/layouts/BaseLayout/Header/index';
import { Siders } from '@/components/layouts/BaseLayout/Siders/index';
import { Affix, ConfigProvider, Layout, theme } from 'antd';
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
        <div className="li-container" style={{ overflow: 'hidden' }}>
          <div className="li-slide-body">
            <Siders />
            <SidersWarp />
          </div>
          <div className='h-full bg-li-fitbg w-full'>
            <div className='h-full w-full'>
              <Content
                style={{ maxHeight: 'calc(900px - 140px)', overflowY: 'auto' }}
              >
                <div className="text-center h-full" >
                  {children}
                </div>
              </Content>

            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

