import { useEffect } from "react";
import { Layout } from "../../app/Layout";
import useProviderStore from "./providerStore";
import { ProviderTable } from "./ProviderTable";
import { Button, Container, Flex } from "@mantine/core";
import { Link } from "react-router-dom";

const ProviderList = () => {
  const { data, find } = useProviderStore((state) => ({ data: state.data, find: state.find }));
  useEffect(() => {
    find();
  }, [find]);
  return (
    <Layout>
      <Container fluid p={20} bg="white" >
        <Flex justify="space-between" align="center" >
          <h2>Provider List</h2>
          <Link to="/providers/new">
            <Button>Create New Provider</Button>
          </Link>
        </Flex>
        <ProviderTable data={data} />
      </Container>
    </Layout>
  );
}

export default ProviderList;
