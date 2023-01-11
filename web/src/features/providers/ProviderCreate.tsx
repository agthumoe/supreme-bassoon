import React from "react";
import { Layout } from "../../app/Layout";
import { Button, Container, Group, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ProviderDto } from "./types";
import useProviderStore from "./providerStore";
import { useNavigate } from "react-router-dom";

const ProviderCreate = () => {
  const navigate = useNavigate();
  const form = useForm<Omit<ProviderDto, "id">>({
    initialValues: {
      name: '',
      host: '',
      port: 256,
      secure: true,
      username: '',
      password: '',
      searchIndex: 1
    },
  });

  const create = useProviderStore((state) => state.create);

  const onFormSubmit = async (values: Omit<ProviderDto, "id">) => {
    const response = await create(values);
    if (response.id) {
      navigate(-1);
    }
    // login(values);
  };
  return (
    <Layout>
      <Container fluid p={20} bg="white" >
        <h2>Provider Create</h2>

        <form onSubmit={form.onSubmit(onFormSubmit)}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="Please provide your name"
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Host"
              placeholder="Please provide your host"
              {...form.getInputProps('host')}
            />
            <TextInput
              label="Port"
              placeholder="Please provide your email's port"
              {...form.getInputProps('port')}
            />
            <TextInput
              label="Username"
              placeholder="Please provide username"
              {...form.getInputProps('username')}
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Please provide password"
              {...form.getInputProps('password')}
            />
            <TextInput
              label="Search Index"
              placeholder="Please provide email provider search index"
              {...form.getInputProps('searchIndex')}
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

export default ProviderCreate;
