import { Row, Col, Button } from "antd";

export default function Home() {


  return (
    <div className="grid-demo">
      <Row gutter={[16, 16]}>
        <Col span={24} md={12} lg={8}>
          <div className="h-[100px] m-[10px] bg-[#f44336]" >
          </div>
        </Col>
        <Col span={24} md={12} lg={8}>
          <div className="h-[100px] m-[10px] bg-[#4caf50]" >
          </div>
        </Col>
        <Col span={24} md={12} lg={8}>
          <div className="h-[100px] m-[10px] bg-[#2196f3]" >
          </div>
        </Col>
        <Col span={24} md={6} lg={4}>
          <div className="h-[100px] m-[10px] bg-[#ffc107]"  >
          </div>
        </Col>
        <Col span={24} md={6} lg={4}>
          <div className="h-[100px] m-[10px] bg-[#ff9800]"  >
          </div>
        </Col>
        <Col span={24} md={6} lg={4}>
          <div className="h-[100px] m-[10px] bg-[#9c27b0]"  >
          </div>
        </Col>
      </Row>
    </div>
  )
}


