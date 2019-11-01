import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Timeline,
  Icon,
  Tabs,
} from 'antd';
import GoogleMapReact from 'google-map-react';

const { TabPane } = Tabs;

const FormItem = Form.Item;
const Option = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const BusRoute = props => {
  const [points, setPoints] = useState([]);
  const [map, setMap] = useState(null);

  const handleOnClick = async ev => {
    const { lat, lng } = ev;
    console.log(lat, lng);
    if (points.length > 0) {
      const curPt = { ...points[points.length - 1] };
      // const directions = await getDirections(curPt, { lat, lng });
      var flightPath = new map.maps.Polyline({
        path: [curPt, ...[]],
        geodesic: true,
        strokeColor: '#88191d',
        strokeOpacity: 1,
        strokeWeight: 5,
      });

      flightPath.setMap(map.map);
    }
    points.push({ lat, lng });

    setPoints([...points]);
  };

  const handleGoogleMapApi = map => setMap(map);
  return (
    <Card title="Bus route">
      <Row>
        <Col>
          <Form {...formItemLayout}>
            <FormItem label="Name">
              <Input />
            </FormItem>
            <FormItem label="Bus">
              <Select style={{ minWidth: 200 }}>
                <Option value="1">Quận 7 - Bình Chánh</Option>
                <Option value="2">Quận 2 - Quận 8</Option>
                <Option value="3">Sân Bay - Gò Vấp</Option>
              </Select>
            </FormItem>
            <FormItem label="Supervisor">
              <Select style={{ minWidth: 200 }}>
                <Option value="1">Thảo Hoàng</Option>
                <Option value="2">Đăng Nguyễn</Option>
                <Option value="3">Hùng Võ</Option>
              </Select>
            </FormItem>
          </Form>
        </Col>
      </Row>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bus Stop" key="1" style={{ padding: 18 }}>
          <Row gutter={16} type="flex">
            <Col span={8}>
              <Timeline>
                <Timeline.Item
                  dot={
                    <Icon
                      type="play-circle"
                      style={{ fontSize: '16px', color: '#52c41a' }}
                    />
                  }
                >
                  <Row type="flex" align="top" justify="space-between">
                    <Col>
                      Đại học Quốc tế Hồng Bàng
                      <br />
                      <Row
                        style={{
                          marginTop: 16,
                          fontSize: 12,
                          fontStyle: 'italic',
                          color: 'rgba(0,0,0,0.45)',
                        }}
                      >
                        20 min
                      </Row>
                    </Col>
                    <Col>
                      <Icon type="edit" style={{ marginLeft: 12 }} />{' '}
                      <Icon
                        type="cross"
                        style={{ color: 'red', marginLeft: 4 }}
                      />
                      <Icon type="arrow-up" style={{ marginLeft: 12 }} />
                      <Icon type="arrow-down" style={{ marginLeft: 8 }} />
                    </Col>
                  </Row>
                </Timeline.Item>
                <Timeline.Item
                  dot={
                    <Icon type="clock-circle-o" style={{ fontSize: '16px' }} />
                  }
                >
                  <Row type="flex" align="top" justify="space-between">
                    <Col>
                      Vòng xoay Điện Biên Phủ <br />
                      <Row
                        style={{
                          marginTop: 16,
                          fontSize: 12,
                          fontStyle: 'italic',
                          color: 'rgba(0,0,0,0.45)',
                        }}
                      >
                        20 min
                      </Row>
                    </Col>
                    <Col>
                      <Icon type="edit" style={{ marginLeft: 12 }} />{' '}
                      <Icon
                        type="cross"
                        style={{ color: 'red', marginLeft: 4 }}
                      />
                      <Icon type="arrow-up" style={{ marginLeft: 12 }} />
                      <Icon type="arrow-down" style={{ marginLeft: 8 }} />
                    </Col>
                  </Row>
                </Timeline.Item>
                <Timeline.Item
                  dot={
                    <Icon type="clock-circle-o" style={{ fontSize: '16px' }} />
                  }
                >
                  <Row type="flex" align="top" justify="space-between">
                    <Col>
                      Võ Thị Sáu
                      <br />
                      <Row
                        style={{
                          marginTop: 16,
                          fontSize: 12,
                          fontStyle: 'italic',
                          color: 'rgba(0,0,0,0.45)',
                        }}
                      >
                        20 min
                      </Row>
                    </Col>
                    <Col>
                      <Icon type="edit" style={{ marginLeft: 12 }} />{' '}
                      <Icon
                        type="cross"
                        style={{ color: 'red', marginLeft: 4 }}
                      />
                      <Icon type="arrow-up" style={{ marginLeft: 12 }} />
                      <Icon type="arrow-down" style={{ marginLeft: 8 }} />
                    </Col>
                  </Row>
                </Timeline.Item>
                <Timeline.Item
                  dot={
                    <Icon
                      type="close-circle"
                      style={{ fontSize: '16px', color: 'red' }}
                    />
                  }
                >
                  <Row type="flex" align="top" justify="space-between">
                    <Col>49 Phạm Ngọc Thạch</Col>
                    <Col>
                      <Icon type="edit" style={{ marginLeft: 12 }} />{' '}
                      <Icon
                        type="cross"
                        style={{ color: 'red', marginLeft: 4 }}
                      />
                      <Icon type="arrow-up" style={{ marginLeft: 12 }} />
                      <Icon type="arrow-down" style={{ marginLeft: 8 }} />
                    </Col>
                  </Row>
                </Timeline.Item>
              </Timeline>
            </Col>
            <Col span={16} style={{ minHeight: 480 }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyDxn1JyUEjelPN8IoDNWYO-HBTExzyaxE4',
                }}
                defaultCenter={{
                  lat: 10.8000835,
                  lng: 106.7042577,
                }}
                defaultZoom={17}
                layerTypes={['TrafficLayer']}
                onClick={handleOnClick}
                onGoogleApiLoaded={handleGoogleMapApi}
              >
                {/* {points.map((point, idx) => (
              <AnyReactComponent lat={point.lat} lng={point.lng} key={idx} />
            ))} */}
              </GoogleMapReact>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Students" key="2" style={{ padding: 18 }}></TabPane>
      </Tabs>
    </Card>
  );
};

export default BusRoute;
