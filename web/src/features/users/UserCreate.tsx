import React from "react";
import { Layout } from "../../app/Layout";
import { Button, Container, Group, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { PasswordDto, UserDto } from "./types";
import useUserStore from "./userStore";
import { useNavigate } from "react-router-dom";

const UserCreate = () => {
  const navigate = useNavigate();
  const form = useForm<Omit<UserDto, "id"> & PasswordDto>({
    initialValues: {
      username: '',
      email: '',
      name: '',
      password: ''
    },

    validate: {
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const create = useUserStore((state) => state.create);

  const onFormSubmit = async (values: Omit<UserDto, "id"> & PasswordDto) => {
    const response = await create(values);
    if (response.id) {
      navigate(-1);
    }
    // login(values);
  };
  return (
    <Layout>
      <Container fluid p={20} bg="white" >
        <h2>User Create</h2>

        <form onSubmit={form.onSubmit(onFormSubmit)}>
          <Stack>
            <TextInput
              label="Username"
              placeholder="Please provide your username"
              {...form.getInputProps('username')}
            />
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
            <PasswordInput
              required
              label="Password"
              placeholder="Please provide your password"
              {...form.getInputProps('password')}
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

export default UserCreate;
