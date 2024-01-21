<script>
  import { onMount } from "svelte";
  import { generalApi } from "../../../../utils";
  import { page } from "$app/stores";
  import {
    MagnifyingGlass,
    Pencil1,
    PlusCircled,
    Trash,
  } from "radix-icons-svelte";
  import CodeEditor from "$lib/codeEditor/CodeEditor.svelte";

  let { port, key } = $page.params;
  /**
   * @type {any[]}
   */
  let entities = [];
  let selectedEntity = "";
  let searchText = "";
  let isAdd = false;
  /**
   * @type {any[]}
   */
  let collectionData = [];
  /**
   * @type {any[]}
   */
  let workingCollectionData = [];

  let newData = {};
  let newEnityName = "";

  let newProperty = {
    value: "",
    name: "",
  };

  let updateData = {};

  const makeNullOjectfromCollections = (/** @type {any[]} */ collections) => {
    let nullObject = {};
    collections.forEach((collection) => {
      nullObject = { ...nullObject, [collection]: null };
    });
    return nullObject;
  };

  /**
   * @type {any[]}
   */
  let columns = [];

  const findLatest = (/** @type {any[]} */ dataArray) => {
    let latestEntry = null;
    let latestTimestamp = 0;

    dataArray.forEach((entry) => {
      const timestamp = new Date(entry.time_stamp_create).getTime();

      if (timestamp > latestTimestamp) {
        latestTimestamp = timestamp;
        latestEntry = entry;
      }
    });

    return latestEntry;
  };

  const fetchEntities = () => {
    generalApi
      .get("/db/collections")
      .then((res) => {
        entities = res.data;
        console.log("LOG:::res", res.data);
      })
      .catch((er) => {
        console.log("LOG:::er", er);
      });
  };

  const getCollectionData = (/** @type {string} */ name) => {
    generalApi
      .get("/" + name)
      .then((res) => {
        collectionData = res.data;
        workingCollectionData = res.data;
        columns = Object.keys(res.data[0]);
      })
      .catch((er) => {
        console.log("LOG:::er", er);
      });
  };

  const searchCollection = (/** @type {string} */ value) => {
    if (value === "") {
      collectionData = workingCollectionData;
      return;
    }
    collectionData = workingCollectionData.filter((entry) => {
      return Object.values(entry).some((val) => {
        return checkType(val).includes(value);
      });
    });
  };

  const onUpdateCollectionData = (/** @type {string} */ id) => {
    console.log("LOG:::id", id);
    generalApi
      .put("/" + selectedEntity + "/" + id, updateData)
      .then((res) => {
        getCollectionData(selectedEntity);
      })
      .catch((er) => {
        console.log("LOG:::er", er);
      });
  };

  const onDeleteCollectionData = (/** @type {string} */ id) => {
    generalApi
      .delete("/" + selectedEntity + "/" + id)
      .then((res) => {
        getCollectionData(selectedEntity);
      })
      .catch((er) => {
        console.log("LOG:::er", er);
      });
  };

  const saveData = () => {
    if (!newEnityName) {
      alert("Please enter a name for the entity");
      return;
    }
    generalApi
      .post("/" + newEnityName, newData)
      .then((res) => {
        getCollectionData(newEnityName);
        isAdd = false;
      })
      .catch((er) => {
        console.log("LOG:::er", er);
      });
  };

  const checkType = (/** @type {any} */ value) => {
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    return value;
  };

  onMount(() => {
    generalApi.setHeader("Authorization", `Bearer ${key}`);
    generalApi.setBaseURL("http://localhost:" + port);
    fetchEntities();
  });
</script>

<div class="my-8 mx-40 bg-white p-4">
  <div class="flex space-x-2 mb-4">
    <img src="/jabdb.png" width="60" class="rounded-lg" alt="" />
    <h1 class="text-lg font-bold mt-3">JabulaneDB</h1>
  </div>
  <p>Your data matters on : http://localhost:{port}</p>

  {#if isAdd}
    <div>
      <div class="flex space-x-2">
        <button class="btn" on:click={() => (isAdd = false)}>Go Back</button>
        <input
          bind:value={newEnityName}
          class="input border-gray-500 input-bordered w-full max-w-xs"
          placeholder="Entity name"
        />
      </div>

      <div class="flex mt-5 space-x-2">
        <input
          bind:value={newProperty.name}
          class="input border-gray-500 input-bordered w-full max-w-xs"
          placeholder="name"
        />
        <input
          bind:value={newProperty.value}
          class="input border-gray-500 input-bordered w-full max-w-xs"
          placeholder="value"
        />
        <button
          class="btn"
          on:click={() => {
            newData = { ...newData, [newProperty.name]: newProperty.value };
          }}>Append property</button
        >

        <button
          class="btn bg-green-500"
          on:click={() => {
            saveData();
          }}>Save Data</button
        >
      </div>
      <div class="mockup-code mt-2">
        <pre prefix=""><code
            on:input={(event) => {
              newData = event?.target?.innerText;
            }}
            contenteditable="false">{JSON.stringify(newData, null, "\t")}</code
          ></pre>
      </div>
    </div>
  {/if}
  {#if !isAdd}
    <div class=" overflow-y-scroll h-screen">
      <div class="flex flex-wrap space-x-2 mb-2">
        <select
          bind:value={selectedEntity}
          on:change={() => {
            getCollectionData(selectedEntity);
          }}
          class="select border-gray-500 w-full max-w-xs"
        >
          {#each entities as entity}
            <option value={entity} class="">{entity}</option>
          {/each}
        </select>

        <input
          class="input border-gray-500 input-bordered w-full max-w-xs"
          bind:value={searchText}
        />
        <button on:click={() => searchCollection(searchText)} class="btn bt-sm"
          ><MagnifyingGlass /> Search</button
        >
        <button
          on:click={() => {
            newData = makeNullOjectfromCollections(columns);
            newEnityName = selectedEntity;
            isAdd = true;
          }}
          class="btn"><PlusCircled /> Add Data</button
        >
      </div>

      {#if !collectionData}
        <span class="loading loading-ring loading-lg"></span>
      {/if}
      {#if collectionData}
        {#if collectionData.length === 0}
          <div class="mockup-code mt-4">
            <pre prefix=""><code>[]</code></pre>
          </div>
        {/if}

        {#if collectionData.length != 0}
          <div role="alert" class="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="stroke-info shrink-0 w-6 h-6"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path></svg
            >
            <span
              >Latest creation :{JSON.stringify(
                findLatest(collectionData)
              )}</span
            >
          </div>
          {#each collectionData as collection}
            <div class="mockup-code mt-2">
              <div class="flex space-x-4 mx-2 mb-4">
                <button
                  class="btn btn-sm"
                  on:click={() => onDeleteCollectionData(collection?.id)}
                  ><Trash />delete</button                                                                                                                                                          
                >
                <button
                  on:click={() => onUpdateCollectionData(collection?.id)}
                  class="btn btn-sm"><Pencil1 />update</button
                >
              </div>
              <pre prefix=""><code on:input={(event)=>{
                updateData = event?.target?.textContent;
              }} contenteditable="true"
                  >{JSON.stringify(collection, null, "\t")}</code
                ></pre>
            </div>
          {/each}
        {/if}
      {/if}
    </div>
  {/if}
</div>
