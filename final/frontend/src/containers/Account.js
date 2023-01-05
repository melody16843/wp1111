import React from 'react';
import { useState, useEffect } from 'react';
import AccountModal from '../components/AccountModal';
import { Space, Table, Tag, Button } from 'antd';
import ButtonAppBar from '../components/ButtonAppBar';
import { DeleteTwoTone } from '@ant-design/icons';
import axios from '../api';
import { useLogin } from './hook/useLogin';
// import { useEdit } from './hook/useEdit';
import { useLocation } from 'react-router-dom';

const Account = () => {
  const { setStatus } = useLogin();
  // const { id } = useEdit();
  const [modalOpen, setModalOpen] = useState(false);
  const {state} = useLocation()

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (_, { cost }) => {
        return (<p>${cost}</p>);
      }
    },
    {
      title: 'Who paid?',
      dataIndex: 'whoPaid',
      key: 'whoPaid',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'cyan' : 'gold';
            if (tag === 'dinner') {
              color = 'volcano';
            }
            if (tag.length === 3) {
              color = 'red';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">

          <Button onClick={() => { handleDelete(record.key) }}>
            <DeleteTwoTone twoToneColor="#eb2f96" />
          </Button>
        </Space>
      ),
    },
  ];
  const data = [
    // {
    //   date: '2023-01-01',
    //   cost: 0,
    //   whoPaid: 'user1',
    //   tags: ['example1', 'tag1'],
    //   key: '1',
    // },
    // {
    //   date: '2023-01-01',
    //   cost: 300,
    //   whoPaid: 'user2',
    //   tags: ['train', 'taipei'],
    //   key: '2',
    // },

  ];

  const [expenseData, setExpenseData] = useState(data);
  const [add, setAdd] = useState(false);

  const handleDelete = async (n) => {
    let key = n;
    console.log('key: ', key);
    const newData = expenseData.filter(obj => {
      return obj.key !== key;
    });
    await setExpenseData(newData);
    setAdd(true);
  };

  const getInit = async () => {
    await axios.post("/get-account", { params: state.id })
    .then((res) => {
      setExpenseData(res.data.initData);
    if (!res.data.initData) setStatus({ type: 'info', msg: 'Data updated.' })
  })};

  // init data
  useEffect(() => {getInit()}, []);

  // update data
  useEffect(() => {
    if (add){
      console.log('new: ', expenseData);
      console.log(state)
      axios.post("/account", { id:state.id, data:expenseData })
        .then((response) => {
          // console.log(response)
          if (response.status === 200) {
            setStatus(
              {
                type: 'success',
                msg: 'The change is saved in your account!'
              });
            console.log('The change is saved in your account!');
          } else {
            setStatus({ type: 'error', msg: 'An error occurred. Please try again.' });
            console.log('An error occurred, please try again.');
          }
        });
      setAdd(false);
    }
  }, [add, expenseData])

  return (
    <div className="content">
      <div className="container-fluid">

        <div className="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20">
          {/* Top Tool Bar -- Photo Article Account */}
          <ButtonAppBar />
          <Space direction="vertical" style={{ width: '100%', padding: '1em' }}>
            <Button type='default' onClick={() => { setModalOpen(true) }} block>Click to enter expense!</Button>
            <AccountModal
              open={modalOpen}
              onCreate={(expense) => {
                // action upon clicking 'create'
                expense.key = (expenseData.length + 1).toString();
                let newData = expenseData;
                newData.push(expense);
                console.log('newData ', newData);
                setExpenseData(newData);
                setModalOpen(false);
                setAdd(true);
              }}
              onCancel={
                () => { setModalOpen(false); }}
            />
          </Space>
          {add ? <></> : <Table columns={columns} dataSource={expenseData} />}
        </div>
      </div>
    </div>

  );
}
export default Account;


