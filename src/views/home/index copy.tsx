import { useRecoilState } from "recoil";
import Store from "@/store";
import { Row, Col, Button } from "antd";

export default function Home() {
  const [nameState, setNameState] = useRecoilState(Store.nameState);

  return (
    <Row justify="center" className="content-body home-box">
      <Col span={24}>
        {nameState}
        <Button onClick={() => { setNameState("王五"); }}>
          点击
        </Button>
        <button onClick={() => open()}>Connect</button>
      </Col>
    </Row>
  )
}
