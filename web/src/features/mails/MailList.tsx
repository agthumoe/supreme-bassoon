import { useEffect } from "react";
import { Layout } from "../../app/Layout";
import useMailStore from "./mailStore";
import { MailTable } from "./MailTable";
import { Button, Container, Flex } from "@mantine/core";
import { Link } from "react-router-dom";

const MailList = () => {
  const { data, find } = useMailStore((state) => ({ data: state.data, find: state.find }));
  useEffect(() => {
    find();
  }, [find]);
  return (
    <Layout>
      <Container fluid p={20} bg="white" >
        <Flex justify="space-between" align="center" >
          <h2>Mail List</h2>
          <Link to="/mails/new">
            <Button>Create New Mail</Button>
          </Link>
        </Flex>
        <MailTable data={data} />
      </Container>
    </Layout>
  );
}

export default MailList;
