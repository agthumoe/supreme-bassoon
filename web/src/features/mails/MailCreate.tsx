import { Layout } from "../../app/Layout";
import { Button, Container, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CreateMailDto } from "./types";
import useMailStore from "./mailStore";
import { useNavigate } from "react-router-dom";

const MailCreate = () => {
  const navigate = useNavigate();
  const form = useForm<CreateMailDto>({
    initialValues: {
      toName: '',
      toEmail: '',
      subject: '',
      body: '',
    },
  });

  const create = useMailStore((state) => state.create);

  const onFormSubmit = async (values: CreateMailDto) => {
    const response = await create(values);
    if (response.id) {
      navigate(-1);
    }
    // login(values);
  };
  return (
    <Layout>
      <Container fluid p={20} bg="white" >
        <h2>Mail Create</h2>

        <form onSubmit={form.onSubmit(onFormSubmit)}>
          <Stack>
            <TextInput
              label="To Name"
              placeholder="Please provide name"
              {...form.getInputProps('toName')}
            />
            <TextInput
              label="Email"
              placeholder="Please provide email"
              {...form.getInputProps('toEmail')}
            />
            <TextInput
              label="Subject"
              placeholder="Please provide subject"
              {...form.getInputProps('subject')}
            />
            <TextInput
              label="Body"
              placeholder="Please provide body"
              {...form.getInputProps('body')}
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

export default MailCreate;
