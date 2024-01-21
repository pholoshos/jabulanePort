<!-- src/App.svelte -->
<script>
  // @ts-nocheck

  import {
    fns,
    AppShell,
    Navbar,
    Header,
    Title,
    Divider,
    Button,
    Center,
    Grid,
    Tabs,
    Flex,
    Input,
    Image,
    Text,
    Accordion,
    Stack,
    Timeline,
    Group,
    Alert,
    Breadcrumbs,
  } from "@svelteuidev/core";
  import { Clock, DotFilled, Download, Link1 } from "radix-icons-svelte";
  import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
  import moment from "moment";
  import { afterUpdate, onMount } from "svelte";

  import { goto } from "$app/navigation";
  import { api, baseUrl, generalApi } from "../../utils";
  import user from "../../store/user";
  import { getData, getToken } from "../../utils/localStorage";

  let grades = [];
  let isLoading = false;
  let link;

  let _user;

  user.subscribe((value) => {
    _user = value;
  });

  const getGrades = () => {
    api
      .get("/project/grades/" + _user.id)
      .then((res) => {
        if (res.ok) {
          grades = res.data;
        }
      })
      .catch((er) => {
        console.log("LOG:::err", er);
      });
  };

  const onDownload = (selected) => {
    isLoading = true;
    api
      .get("/project/certificate/generate/" + _user.id + "/" + selected)
      .then((res) => {
        if (res.ok) {
          // Create a URL for the Blob
          const link = document.createElement("a");
          link.href = baseUrl + "/" + res.data.filename;
          link.download = "document.pdf";
          link.click();
        }
        isLoading = false;
      })
      .catch((er) => {
        isLoading = false;
        console.log("LOG:::err", er);
      });
  };

  onMount(() => {
    const token = getToken();
    _user = getData("user");
    if (!token) {
      goto("/landing", { replaceState: true });
    }
    api.setHeader("Authorization", `Bearer ${token}`);
    generalApi.setHeader("Authorization", `Bearer ${token}`);
    getGrades();
  });

  //project/certificate/generate/649dab6f39627c0028537e23/64e8b7438667e40031fa200d
</script>

<AppShell  class='bg-white p-8'>
  <Navbar
    class="rounded-lg"
    height={"100vh"}
    width={{
      // When viewport is larger than theme.breakpoints.sm, Navbar width will be 300px
      sm: 100,

      // When viewport is larger than theme.breakpoints.lg, Navbar width will be 400px
      lg: 250,

      // When other breakpoints do not match base width is used, defaults to 100%
      base: 100,
    }}
    slot="navbar"
    hidden={!false}
  >
    <div class="m-2 p-2 h-screen overflow-y-scroll">
      <div class="mb-4">
        <!-- <Button
          class="mb-2"
          color="gray"
          on:click={() => {
            goto("/", { replaceState: true });
            console.log("LOG:::click");
          }}>Go back</Button
        > -->
        <Breadcrumbs color="green" class="mb-4" size="md" separator="→">
          <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item class='mt-2' active={true}>Grades</Breadcrumbs.Item>
        </Breadcrumbs>
        <Title order={3}>Grades for {_user.lastName} {_user.firstName}</Title>
        <p>Your splearn grades</p>
      </div>
    </div></Navbar
  >
  <Header class="rounded-lg" slot="header">
    <div class="p-3 rounded-lg">
      <Flex class="align-middle">
        <Flex>
          <Image radius="md" src="/logo.jpeg" class={"w-10 rounded-md"} />
    <h1  class={"ml-2 mt-2 "}>Splearn</h1>
        </Flex>
      </Flex>
    </div>
  </Header>

  <main class=" overflow-y-scroll -my-4 -mx-3 p-4 h-screen bg-white rounded-md">
    <Alert>
      <Text class="mb-4"
        >You need a minimum of 50% to get certificate on tests written</Text
      >
    </Alert>
    <!-- <Tabs color="green">
      <Tabs.Tab label="All" tabKey="all" />
      <Tabs.Tab label="Passed" tabKey="passed" />
      <Tabs.Tab label="Failed" tabKey="failed" />
    </Tabs> -->
    <Image width={"100%"} height={150} class={"mb-4"} src="/bc1.jpg" />

    <ListBox>
      {#each grades as grade}
        <ListBoxItem class=" rounded-md hover:bg-green-300 selection:bg-gray-500 active:bg-gray-200" name="medium" value={grade._id}>
          <Flex class='justify-between'>
            <Title order={4}>{grade.title}</Title>
            <Flex class="">
              <Text class="mt-2  mr-4">
                {grade.grade}
              </Text>
              {#if grade.grade > 49}
                <Button
                  loaderProps={{ color: "green", size: "sm" }}
                  color="green"
                  loading={isLoading}
                  on:click={() => {
                    onDownload(grade._id);
                  }}
                  variant="subtle"><Download />Certificate</Button
                >
              {/if}
              <Button
                loaderProps={{ color: "green", size: "sm" }}
                color="gray"
                loading={isLoading}
                on:click={() => {
                  goto("/project/" + grade.projectId);
                }}
                variant="subtle"><Link1 /> Goto Course</Button
              >
            </Flex>
          </Flex>
        </ListBoxItem>
      {/each}
    </ListBox>
  </main>
</AppShell>

<style lang="postcss" src="./tailwind.css"></style>
