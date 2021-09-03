import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Descriptions, Row, Col, Card, Pagination, Spin, Icon } from 'antd';
import { actionCreator } from 'store/dataTable/dataTable.meta';

const DefaultCardData = ({ item }) => {
  const keys = Object.keys(item);
  return (
    <Descriptions title="Info" column={1}>
      {keys.map(key => (
        <Descriptions.Item key={key} label={key}>
          {item[key]}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

const GridView = ({
  data = [],
  count = 0,
  getList,
  url,
  setPage,
  loading,
  ContentComponent,
}) => {
  const getTableData = () => {
    url && getList({ url, limit: 9 });
  };
  useEffect(() => {
    setPage(1);
    getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, true);

  return (
    <Fragment>
      <Row gutter={16} style={{ margin: '0 12px' }}>
        <Spin spinning={loading} indicator={<Icon type="loading" spin />}>
          {data.map(item => (
            <Col key={item.id} xs={12} md={8} style={{ marginTop: 16 }}>
              <Card bodyStyle={{ padding: 12 }}>
                {ContentComponent ? (
                  <ContentComponent item={item} />
                ) : (
                  <DefaultCardData item={item} />
                )}
              </Card>
            </Col>
          ))}
        </Spin>
      </Row>
      <Row style={{ display: 'flex', justifyContent: 'flex-end', margin: 12 }}>
        <Pagination
          total={count}
          onChange={pagination => {
            setPage(pagination);
            getTableData();
          }}
        />
      </Row>
    </Fragment>
  );
};

const mapDispatchToProps = {
  getList: actionCreator.getList,
  deleteItem: actionCreator.deleteItem,
  setPage: actionCreator.setPage,
};

const mapStateToProps = state => state.dataTable;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridView);
