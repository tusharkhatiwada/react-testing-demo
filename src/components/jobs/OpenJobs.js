import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Table,
  Input,
  Button,
  Modal,
  Form,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../../App.css";

const { Title } = Typography;
const { Search } = Input;

const columns = [
  // {
  //   title: "#",
  //   dataIndex: "index",
  // },
  {
    title: "TimeStamp",
    dataIndex: "timestamp",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Err",
    dataIndex: "err",
  },
  {
    title: "Gene",
    dataIndex: "gene",
  },
  {
    title: "Gene Structure",
    dataIndex: "geneStructure",
  },
  {
    title: "Gene Mutation",
    dataIndex: "geneMutation",
  },
  {
    title: "Schrodinger Component",
    dataIndex: "schrodingerComponent",
  },
  {
    title: "Schrodinger Action",
    dataIndex: "schrodingerAction",
  },
  {
    title: "Job Remarks",
    dataIndex: "jobRemarks",
  },
];

const data = [
  {
    key: 0,
    index: 1,
    timestamp: "2020-01-20 12:33:25",
    status: "running",
    err: "",
    gene: "job",
    geneStructure: "acta1",
    geneMutation: "2w49.dtok",
    schrodingerComponent: "desmond",
    schrodingerAction: "md",
    jobRemarks: "t150a_kuvan_grid4_60ns",
  },
  {
    key: 1,
    index: 2,
    timestamp: "2020-02-11 11:33:25",
    status: "finished",
    err: "",
    gene: "acta1",
    geneStructure: "grid4",
    geneMutation: "broadxp",
    schrodingerComponent: "glide-dock",
    schrodingerAction: "SP",
    jobRemarks: "grid3",
  },
  {
    key: 2,
    index: 3,
    timestamp: "2020-02-13 12:33:25",
    status: "died",
    err: "",
    gene: "2w49.dtok",
    geneStructure: "grid4",
    geneMutation: "2",
    schrodingerComponent: "glide-grid",
    schrodingerAction: "acta1",
    jobRemarks: "",
  },
  {
    key: 3,
    index: 4,
    timestamp: "2020-01-20 12:33:25",
    status: "running",
    err: "",
    gene: "job",
    geneStructure: "acta1",
    geneMutation: "2w49.dtok",
    schrodingerComponent: "desmond",
    schrodingerAction: "md",
    jobRemarks: "t150a_kuvan_grid4_60ns",
  },
  {
    key: 4,
    index: 5,
    timestamp: "2020-02-11 11:33:25",
    status: "finished",
    err: "",
    gene: "acta1",
    geneStructure: "grid4",
    geneMutation: "broadxp",
    schrodingerComponent: "glide-dock",
    schrodingerAction: "SP",
    jobRemarks: "grid3",
  },
  {
    key: 5,
    index: 6,
    timestamp: "2020-02-13 12:33:25",
    status: "died",
    err: "",
    gene: "2w49.dtok",
    geneStructure: "grid4",
    geneMutation: "2",
    schrodingerComponent: "glide-grid",
    schrodingerAction: "acta1",
    jobRemarks: "",
  },
];

const OpenJobs = () => {
  const [visible, toggleVisible] = useState(false);
  const [openJobsData, setOpenJobsData] = useState(data);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const toggleModal = () => {
    toggleVisible(!visible);
  };

  return (
    <>
      <div className='site-card-wrapper open-jobs'>
        <Row gutter={16}>
          <Col span={4}>
            <Card
              title='Running Jobs'
              bordered
              headStyle={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#1CA1E2",
              }}
              bodyStyle={{
                textAlign: "center",
                fontWeight: "bold",
                borderColor: "#1CA1E2",
              }}
              style={{ borderColor: "#1CA1E2" }}
            >
              <Title level={2} style={{ color: "#1CA1E2" }}>
                1
              </Title>
            </Card>
          </Col>
          <Col span={4}>
            <Card
              title='Waiting Jobs'
              bordered
              headStyle={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#1CA1E2",
              }}
              bodyStyle={{
                textAlign: "center",
                fontWeight: "bold",
              }}
              style={{ borderColor: "#1CA1E2" }}
            >
              <Title level={2} style={{ color: "#1CA1E2" }}>
                0
              </Title>
            </Card>
          </Col>
          <Col span={4}>
            <Card
              title='Ended Jobs'
              bordered
              headStyle={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#1CA1E2",
              }}
              bodyStyle={{
                textAlign: "center",
                fontWeight: "bold",
              }}
              style={{ borderColor: "#1CA1E2" }}
            >
              <Title level={2} style={{ color: "#1CA1E2" }}>
                26
              </Title>
            </Card>
          </Col>
        </Row>
      </div>
      <Row style={{ paddingTop: 15, paddingBottom: 15 }}>
        <Col span={24}>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => toggleVisible(true)}
          />
        </Col>
      </Row>
      <Row style={{ paddingTop: 15, paddingBottom: 15 }}>
        <Col span={24}>
          <Search placeholder='Search...' />
        </Col>
      </Row>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={openJobsData}
        size='medium'
        bordered
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title='Upload New Job'
        visible={visible}
        onOk={toggleModal}
        onCancel={toggleModal}
        width={300}
        footer={[
          <Button key='back' onClick={toggleModal}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' onClick={toggleModal}>
            Load Job
          </Button>,
        ]}
        className='upload-job-modal'
      >
        <Form layout='vertical'>
          <Form.Item label='Choose Job Directory'>
            <Input></Input>
          </Form.Item>
          <Form.Item label='Case ID'>
            <Input></Input>
          </Form.Item>
          <Form.Item label='Gene'>
            <Input></Input>
          </Form.Item>
          <Form.Item label='Mutation'>
            <Select>
              <Select.Option value='m1'>Mutation 1</Select.Option>
              <Select.Option value='m2'>Mutation 2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Job Type'>
            <Select>
              <Select.Option value='m1'>Job Type 1</Select.Option>
              <Select.Option value='m2'>Job Type 2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Structure'>
            <Select>
              <Select.Option value='m1'>Structure 1</Select.Option>
              <Select.Option value='m2'>Structure 2</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OpenJobs;
