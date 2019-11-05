import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { actionCreator } from 'store/dataTable/dataTable.meta';

const DataTable = ({
  columns = [],
  data = [],
  count = 0,
  getList,
  url,
  setPage,
  loading,
}) => {
  const getTableData = () => {
    url && getList({ url });
  };

  useEffect(() => {
    setPage(1);
    getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, true);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      rowKey="id"
      bordered
      pagination={{
        total: count,
      }}
      onChange={pagination => {
        setPage(pagination.current);
        getTableData();
      }}
      size="small"
      loading={loading}
      // onRow={(record, rowIndex) => {
      //   return {
      //     onClick: event => {
      //       console.log(record, rowIndex);
      //     },
      //   };
      // }}
    />
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
)(DataTable);
