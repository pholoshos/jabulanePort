<script>
  import { Button, Flex, Image, NativeSelect } from "@svelteuidev/core";
  import { api } from "../../utils";
  import { onMount } from "svelte";
  import { getData, getToken } from "../../utils/localStorage";
  import { goto } from "$app/navigation";

  let author = "";
  let title = "";
  let description = "";
  let user = getData("user");
  let isLoading = false;

  let steps = [
    {
      title: "",
      description: "",
      content: [{ type: "", title: "", description: "", body: "" }],
    },
  ];

  function addStep() {
    steps = [
      ...steps,
      {
        title: "",
        description: "",
        content: [{ type: "", title: "", description: "", body: "" }],
      },
    ];
  }

  function addContent(stepIndex) {
    steps[stepIndex].content = [
      ...steps[stepIndex].content,
      { type: "", title: "", description: "", body: "" },
    ];
  }

  function handleSubmit() {
    console.log("LOG:::steps", steps);
    let _company = user.company ||  'none';
    const data = { title,authorId : user.id, author, description, steps,company :_company };
    isLoading = true;
    api
      .post("/project/", data)
      .then((res) => {
        if (res.ok) {
          goto("/", { replaceState: true });
          console.log("LOG:::created", res.data);
        } else {
        }
        isLoading = false;
      })
      .catch((err) => {});
    // Here you can handle the form submission, including sending the data to your backend using an API or similar.
  }
  onMount(() => {
    const token = getToken();
    api.setHeader("Authorization", `Bearer ${token}`);
  });
</script>

<div class="bg-gray-100 p-6 rounded border my-8 mx-96">
  <Flex class="space-x-2">
    <Image radius="md" src="/logo.jpeg" class={"w-10 rounded-md"} />
    <h2 class="text-2xl font-semibold mb-4">Create Course</h2>
  </Flex>

  <form on:submit|preventDefault={handleSubmit}>
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1" for="author">Author:</label>
      <input
        type="text"
        id="author"
        class="w-full p-2 border rounded"
        bind:value={author}
      />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1" for="title">Title:</label>
      <input
        type="text"
        id="title"
        class="w-full p-2 border rounded"
        bind:value={title}
      />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1" for="description"
        >Description:</label
      >
      <textarea
        id="description"
        class="w-full p-2 border rounded"
        bind:value={description}
      />
    </div>

    {#each steps as step, stepIndex}
      <div class="bg-white p-4 rounded border mb-4">
        <h3 class="text-lg font-semibold mb-2">Step {stepIndex + 1}</h3>
        <div class="mb-2">
          <label class="block text-sm font-medium mb-1" for="step-title"
            >Step Title:</label
          >
          <input
            type="text"
            id="step-title"
            class="w-full p-2 border rounded"
            bind:value={step.title}
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="step-description"
            >Step Description:</label
          >
          <textarea
            id="step-description"
            class="w-full p-2 border rounded"
            bind:value={step.description}
          />
        </div>

        <div class="bg-gray-100 p-2 rounded border">
          {#each step.content as content, contentIndex}
            <h4 class="text-md font-semibold mb-2">
              Content {contentIndex + 1}
            </h4>
            <div class="mb-2">
              <label class="block text-sm font-medium mb-1" for="content-type"
                >Content Type:</label
              >

              <NativeSelect
                data={["text", "image", "video","website", "key", "other"]}
                placeholder="Select content type"
                bind:value={content.type}
              />
            </div>
            <div class="mb-2">
              <label class="block text-sm font-medium mb-1" for="content-title"
                >Content Title:</label
              >
              <input
                type="text"
                id="content-title"
                class="w-full p-2 border rounded"
                bind:value={content.title}
              />
            </div>
            <div class="mb-2">
              <label
                class="block text-sm font-medium mb-1"
                for="content-description">Content Description:</label
              >
              <textarea
                id="content-description"
                class="w-full p-2 border rounded"
                bind:value={content.description}
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1" for="content-body"
                >Content Body:</label
              >
              <textarea
                id="content-body"
                class="w-full p-2 border rounded"
                bind:value={content.body}
              />
            </div>
          {/each}
          <button
            type="button"
            class="bg-green-500 text-white px-2 py-1 rounded"
            on:click={() => addContent(stepIndex)}>Add Content</button
          >
        </div>
      </div>
    {/each}
    <Flex>
      <Button
      color='gray'
        type="button"
        class="bg-green-500 text-white px-4 py-2 rounded mr-2"
        on:click={addStep}>Add Step</Button
      >
      <Button loading={isLoading} type="submit" color='green' class="bg-gray-500 text-white px-4 py-2 rounded"
        >Create Project</Button
      >
    </Flex>
  </form>
</div>
