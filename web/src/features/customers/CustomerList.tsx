import { useEffect } from "react";
import { Layout } from "../../app/Layout";
import useCustomerStore from "./customerStore";
import { CustomerTable } from "./CustomerTable";
import { Button, Container, Flex } from "@mantine/core";
import { Link } from "react-router-dom";

const CustomerList = () => {
  const { data, find } = useCustomerStore((state) => ({ data: state.data, find: state.find }));
  useEffect(() => {
    find();
  }, [find]);
  return (
    <Layout>
      <Container fluid p={20} bg="white" >
        <Flex justify="space-between" align="center" >
          <h2>Customer List</h2>
          <Link to="/customers/new">
            <Button>Create New Customer</Button>
          </Link>
        </Flex>
        <CustomerTable data={data} />
      </Container>
    </Layout>
  );
}

export default CustomerList;
