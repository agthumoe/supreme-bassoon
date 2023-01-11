import React from "react";
import { Layout } from "../../app/Layout";
import { Button, Container, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CustomerDto } from "./types";
import useCustomerStore from "./customerStore";
import { useNavigate } from "react-router-dom";

const CustomerCreate = () => {
  const navigate = useNavigate();
  const form = useForm<Omit<CustomerDto, "id">>({
    initialValues: {
      email: '',
      name: '',
    },
  });

  const create = useCustomerStore((state) => state.create);

  const onFormSubmit = async (values: Omit<CustomerDto, "id">) => {
    const response = await create(values);
    if (response.id) {
      navigate(-1);
    }
    // login(values);
  };
  return (
    <Layout>
      <Container fluid p={20} bg="white" >
        <h2>Customer Create</h2>

        <form onSubmit={form.onSubmit(onFormSubmit)}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="Please provide your email"
              {...form.getInputProps('email')}
            />
            <TextInput
              label="Name"
              placeholder="Please provide your name"
              {...form.getInputProps('name')}
            />
          </Stack>

          <Group position="right" mt="xl">
            <Button type="submit">Create</Button>
          </Group>
        </form>
      </Container>
    </Layout>
  );
}

export default CustomerCreate;
