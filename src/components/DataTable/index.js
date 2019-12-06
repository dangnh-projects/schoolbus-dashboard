import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';
import { actionCreator } from 'store/dataTable/dataTable.meta';

const DataTable = ({ columns = [], url, setPage, dataTranform }) => {
  const { data = [], count = 0, loading } = useSelector(
    state => state.dataTable
  );
  const dispatch = useDispatch();
  const getTableData = () => {
    url && dispatch(actionCreator.getList({ url }));
  };

  useEffect(() => {
    dispatch(actionCreator.setPage(1));
    getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, true);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = selectedRowKeys => {
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
      dataSource={dataTranform ? dataTranform(data) : data}
      rowKey="id"
      bordered
      pagination={{
        total: count,
      }}
      onChange={pagination => {
        dispatch(actionCreator.setPage(pagination.current));
        getTableData();
      }}
      size="small"
      loading={loading}
      // onRow={(record, rowIndex) => {
      //   return {
      //     onClick: event => {
      //     },
      //   };
      // }}
    />
  );
};

export default DataTable;
