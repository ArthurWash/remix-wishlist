import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  Divider,
  TextField,
  useBreakpoints,
  Button,

} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Form} from "@remix-run/react";

export async function loader() {
  // provides data to the component
  // get data from database
  let settings = {
    name: "My App updated",
    description: "My app description",
  
    // Don't forget the form has to have a name attribute to be able to be submitted
  }

  return json(settings);
}

export async function action({ request }) {
  // updates persistent data
  let settings = await request.formData();
  // convert the form into an object
  settings = Object.fromEntries(settings);

  return json(settings);
}

export default function SettingsPage() {
  const settings = useLoaderData();

  const [formState, setFormState] = useState(settings);

  return (
    <Page>
      <TitleBar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings and preferences.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                {/* The below code simply lets us type into the form. */}
                <TextField label="App name" name="name" value={formState.name} onChange={(value) => setFormState({ ...formState, name: value })}/>
                  {/* value={formState.name} sets the value to name property. 
                    onChange/setFormState defines an event handler for when the textfield's value changes. 
                    The function takes the new value as an argument and updates the formState object using setFormState function. 
                    The spread operator (...formState) ensure that the other properties in formState remain unchanged, while the name property is updated.
                    */}
                <TextField label="Description" name="description" value={formState.description} onChange={(value) => setFormState({ ...formState, description: value })} />

                <Button submit={true}>Save</Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
