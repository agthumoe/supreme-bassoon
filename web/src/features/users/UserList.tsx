import { useEffect } from "react";
import { Layout } from "../../app/Layout";
import useUserStore from "./userStore";
import { UserTable } from "./UserTable";
import { Button, Container, Flex } from "@mantine/core";
import { Link } from "react-router-dom";

const UserList = () => {
  const { data, find } = useUserStore((state) => ({ data: state.data, find: state.find }));
  useEffect(() => {
    find();
  }, [find]);
  return (
    <Layout>
      <Container fluid p={20} bg="white" >
        <Flex justify="space-between" align="center" >
          <h2>User List</h2>
          <Link to="/users/new">
            <Button>Create New User</Button>
          </Link>
        </Flex>
        <UserTable data={data} />
      </Container>
    </Layout>
  );
}

export default UserList;
