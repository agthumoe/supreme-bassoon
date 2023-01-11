import { Button, Container, Group, Paper, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import useAuthStore from "./authStore";
import { LoginDto } from "./types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Login() {
  const data = useAuthStore((state) => state.data);
  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();

  useEffect(() => {
    if (data.accessToken && data.refreshToken) {
      navigate('/about');
    }
  }, [data, navigate]);

  const form = useForm<LoginDto>({
    initialValues: {
      username: '',
      password: ''
    },

    validate: {
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const onFormSubmit = async (values: LoginDto) => {
    login(values);
  };

  return (
    <Container w={500} pt={50}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" weight={500}>
          Welcome to Supreme Bassoon Project...
        </Text>
        <p>Please login to continue.</p>

        <form onSubmit={form.onSubmit(onFormSubmit)}>
          <Stack>
            <TextInput
              label="Username"
              placeholder="Please provide your username"
              {...form.getInputProps('username')}
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Please provide your password"
              {...form.getInputProps('password')}
            />
          </Stack>

          <Group position="right" mt="xl">
            <Button type="submit">Login</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}