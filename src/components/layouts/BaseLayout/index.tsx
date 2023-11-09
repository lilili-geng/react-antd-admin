import { Headers } from '@/components/layouts/BaseLayout/Header/index';
import { Siders } from '@/components/layouts/BaseLayout/Siders/index';
import { Layout } from 'antd';
import "./index.less"
import { BaseLayoutProps } from '@/types/layout';
import { SidersWarp } from '@/components/layouts/BaseLayout/SidersWarp/index';

const { Content } = Layout;

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="li-layout">
      <Headers />
      <div className="li-container">
        <div className="li-slide-body">
          <Siders />
          <SidersWarp />
        </div>
        <Layout>
          <Content
          >
            <div className="text-center">
              {children}
            </div>
          </Content>
        </Layout>
      </div>
    </div>
  );
}

