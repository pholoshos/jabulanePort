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
    MediaQuery,
    Grid,
    Flex,
    Modal,
    Input,
    Text,
    Stack,
    Loader,
    Image,
    NativeSelect,
    Timeline,
    Progress,
    Menu,
    Skeleton,
    Badge,
    SimpleGrid,
    Popper,
    Box,
    Tooltip,
  } from "@svelteuidev/core";
  import moment from "moment";
  import {
    Commit,
    Clock,
    CountdownTimer,
    InfoCircled,
    EyeOpen,
    GithubLogo,
    LightningBolt,
    StarFilled,
    DrawingPinFilled,
    Home,
    Bell,
    Check,
  } from "radix-icons-svelte";

  import { Tabs } from "@svelteuidev/core";
  import { Camera, EnvelopeClosed, Gear } from "radix-icons-svelte";
  import { api, generalApi } from "../utils";
  import { onMount, afterUpdate } from "svelte";
  import { goto } from "$app/navigation";
  import user from "../store/user";
  import { getData, getToken } from "../utils/localStorage";
  import {
    selectedProject,
    allProjects,
    updateProjects,
  } from "../store/project";
  import { languages, techStacksAndLanguages } from "../utils/data";

  let isDark = false;
  let opened = false;
  let isCreator = false;

  let projects = [];
  let timeline = [];
  let topic = "";
  let language = "";
  let search = "";
  let isLoading = false;
  let openNotifications = false;
  let notifications = [];

  let _user;

  user.subscribe((value) => {
    _user = value;
  });

  allProjects.subscribe((value) => {
    projects = value;
  });

  const getProjects = (value = 0) => {
    const comp = _user.company || "all";
    projects = [];
    const url = value === 0 ? "/project/" : "/project/org-projects/" + comp;
    isLoading = true;
    api
      .get(url)
      .then((res) => {
        if (res.ok) {
          updateProjects(res.data);
          console.log("LOG:::", projects);
        } else {
        }
        isLoading = false;
      })
      .catch((err) => {});
  };

  const getNotifications = () => {
    generalApi
      .get(`/notification/app?app=splearn&user=${_user.id}`)
      .then((res) => {
        if (res.ok) {
          notifications = res.data;
        } else {
        }
      })
      .catch((err) => {});
  };

  const readNotification = () => {
    const not = notifications.filter((noti) => noti.isRead === false);
    console.log("LOG:::not", not);
    if (!!not) {
      not.map((current) => {
        generalApi
          .put(`/notification/notifications/${current._id}/read`)
          .then((res) => {
            if (res.ok) {
            } else {
            }
          })
          .catch((err) => {});
      });
      getNotifications();
    }
  };

  const checkCreator = () => {
    api
      .get("/project/check-creator/" + _user.id)
      .then((res) => {
        isLoading = true;
        if (res.ok) {
          isCreator = res.data.isCreator;
        } else {
        }
        isLoading = false;
      })
      .catch((err) => {});
  };

  const onSearch = (keyword) => {
    isLoading = true;
    api
      .get(
        `/project/search?keyword=${keyword}&company=${_user.company || "none"}`
      )
      .then((res) => {
        if (res.ok) {
          updateProjects(res.data);
          console.log("LOG:::", projects);
        } else {
        }
        isLoading = false;
      })
      .catch((err) => {});
  };

  const getStarted = (selected) => {
    selectedProject.update(() => selected);
    goto("/project/" + selected._id);
  };

  const getTimeline = () => {
    console.log("LOG:::gettimeline/", _user);
    api
      .get("/timeline/user/" + _user.id)
      .then((res) => {
        if (res.ok) {
          timeline = res.data;
          console.log("LOG:::data");
        }
      })
      .catch((er) => {
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
    getProjects();
    getTimeline();
    checkCreator();
    getNotifications();
  });

  afterUpdate(() => {
    if (!projects) {
      getProjects();
      getTimeline();
    }
  }, []);
</script>

<AppShell class='bg-white p-8'>
  <Navbar
    class="rounded-lg"
    height={"90vh"}
    width={{
      // When viewport is larger than theme.breakpoints.sm, Navbar width will be 300px
      sm: 100,

      // When viewport is larger than theme.breakpoints.lg, Navbar width will be 400px
      lg: 250,

      // When other breakpoints do not match base width is used, defaults to 100%
      base: 150,
    }}
    slot="navbar"
    hidden={!opened}
  >
    <div class="m-2 p-2 overflow-y-scroll h-screen">
      <Timeline
        override={{ height: "100%" }}
        color="green"
        active={timeline.at(1)}
        bulletSize={24}
        lineWidth={2}
      >
        {#each timeline as progress}
          <Timeline.Item active={true} color="green" title={progress?.title}>
            <Text color="" size="sm">
              {progress?.description}
            </Text>

            <Flex class="mt-2">
              <Clock class="mr-1" />
              <Text size="xs"
                >{moment(progress?.date).format("DD/MM/yyyy hh:mm")}</Text
              >
            </Flex>
          </Timeline.Item>
        {/each}
      </Timeline>
    </div>
  </Navbar>

  <Header class="rounded-lg" slot="header">
    <div class="p-2 rounded-lg justify-between flex flex-row">
      <Flex>
        <Image radius="md" src="/logo.jpeg" class={"w-10 rounded-md"} />
        <h1  class={"ml-2 mt-2 "}>Splearn</h1>
      </Flex>

      <Flex class="space-x-4 p-1  mr-8">
        <Tooltip
          color={"white"}
          opened={openNotifications}
          allowPointerEvents
          withArrow
          wrapLines
          transition="rotate-left"
          transitionDuration={250}
          gutter={5}
        >
          <div
            class="bg-gray-400 p-4 rounded-lg w-72 h-96 overflow-x-scroll"
            slot="label"
          >
            {#each notifications as notification}
              <Text color="white" weight="bold" size="sm">
                {notification.message}
              </Text>

              <Text class="mt-2" size="xs">{notification.timestamp}</Text>
              <Divider color="white" />
            {/each}
          </div>
          <Button
            color="gray"
            variant="subtle"
            class='mt-2'
            size={18}
            on:click={() => {
              getNotifications();
              if (!openNotifications) {
                readNotification();
              }
              openNotifications = !openNotifications;
            }}
            ><Bell size={18} /><Text size="xs"
              >{notifications.find((noti) => noti.isRead === false)
                ? "+1"
                : ""}</Text
            >
          </Button>
        </Tooltip>
        <a href="/"><Home color={"gray"} size={18} /></a>
        <a href="/grades"><Check color={"gray"} size={18} /></a>
      </Flex>
    </div>
  </Header>

  <slot>
    <div class="h-screen -mx-3 -my-4 p-3 rounded-lg bg-white overflow-y-scroll">
      <Title order={1}>Welcome to Splearn</Title>
      <p class="mb-6">For learning and building projects</p>
      <div
        class="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <div>
          <NativeSelect
            data={techStacksAndLanguages}
            placeholder="Select topic here"
            bind:value={topic}
            on:change={() => {
              onSearch(topic);
            }}
          />
        </div>

        <div>
          <NativeSelect
            data={languages}
            placeholder="Select language"
            bind:value={language}
            on:change={() => {
              onSearch(language);
            }}
          />
        </div>

        <Input
          bind:value={search}
          placeholder="enter something to search here"
        />

        <Flex>
          <Button
            on:click={() => {
              onSearch(search);
            }}
            color="gray"
            class="mr-2">Search</Button
          >
          {#if isCreator}
            <Menu title="More Options">
              <Button color="gray" slot="control">More Options</Button>

              <Menu.Item on:click={() => goto("/admin", { replaceState: true })}
                >Admin</Menu.Item
              >
              <Menu.Item
                on:click={() => goto("/gettingStarted", { replaceState: true })}
                >Getting Started</Menu.Item
              >
            </Menu>
          {/if}
        </Flex>
      </div>

      <Tabs
        on:change={({ detail: { key } }) => {
          if (key === "org") {
            getProjects(1);
          } else if (key === "you") {
            projects = projects.filter((pro) =>
              timeline.find((t) => t.projectId === pro._id)
            );
          } else {
            getProjects(0);
          }
        }}
        color="teal"
      >
        <Tabs.Tab tabKey={"all"} label="Everything">
          <Image width={"100%"} height={150} class={"mb-4"} src="/bc1.jpg" />
        </Tabs.Tab>

        <Tabs.Tab tabKey={"you"} label="My Work">
          <Image width={"100%"} height={150} class={"mb-4"} src="/b4.jpg" />
        </Tabs.Tab>
        <Tabs.Tab tabKey={"org"} label="My Organisation">
          <Image width={"100%"} height={150} class={"mb-4"} src="/bc3.jpg" />
        </Tabs.Tab>
      </Tabs>

      <Skeleton
        override={{ marginTop: "8px" }}
        visible={isLoading}
        height={isLoading ? 10 : "100%"}
      >
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-scroll h-full"
        >
          {#each projects as project}
            <div class="   bg-gray-100 rounded-lg w-full p-4">
              <Flex>
                {#if timeline.find((t) => t.projectId === project._id)}
                  <DrawingPinFilled size={20} class={"mt-2"} color="green" />
                {/if}
                <Title>
                  {project.title}</Title
                >
              </Flex>

              <Badge color="gray" class="mb-4" variant="filled"
                >{project.author}</Badge
              >
              <p class="mb-6">{project.description}</p>
              <Button
                color="green"
                on:click={() => {
                  getStarted(project);
                }}
              >
                {timeline.find((t) => t.projectId === project._id)
                  ? "Continue"
                  : "Get Started"}</Button
              >
            </div>
          {/each}
        </div>
      </Skeleton>
      <Skeleton
        override={{ marginTop: "8px" }}
        height={40}
        visible={isLoading}
      />
      <Skeleton
        override={{ marginTop: "8px" }}
        height={10}
        visible={isLoading}
      />
      <Skeleton
        override={{ marginTop: "8px" }}
        height={50}
        visible={isLoading}
      />
    </div>
  </slot>
</AppShell>
