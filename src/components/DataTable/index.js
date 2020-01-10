import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';
import { actionCreator } from 'store/dataTable/dataTable.meta';

const DataTable = ({ columns = [], url, setPage, dataTranform, term = '' }) => {
  const { data = [], count = 0, loading, page } = useSelector(
    state => state.dataTable
  );
  const dispatch = useDispatch();
  const getTableData = () => {
    url && dispatch(actionCreator.getList({ url, search: term }));
  };

  useEffect(() => {
    dispatch(actionCreator.setPage(0));
    getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

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
        current: page + 1,
      }}
      onChange={pagination => {
        dispatch(actionCreator.setPage(pagination.current - 1));
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
