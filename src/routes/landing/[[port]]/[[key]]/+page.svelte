<script>
  import { generalApi } from "../../../../utils";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let {port,key} = $page.params;


  const getDbAddress = () => {};

  const authentificate = () => {
    generalApi.setHeader("Authorization", `Bearer ${key}`);
    generalApi.setBaseURL("http://localhost:" + port);
    goto(`/portal/${port}/${key}`, { replaceState: false });
  };
</script>

<div class="mx-auto w-96 my-40 align-middle items-center">
  <h1 class="text-lg font-bold">Portal</h1>
  <p>Your data matters on : http://localhost:{port}</p>
  <input
    value={key}
    class=" border rounded-lg w-full p-2 mb-4 mt-8"
    placeholder="enter your access token here"
  />

  <input
    value="{port}"
    class=" border rounded-lg w-full p-2 mb-4 mt-2"
    placeholder="enter your port here"
  />
  <button
    on:click={authentificate}
    class="p-2 rounded-lg bg-green-400 text-white mx-auto"
    >Authentificate</button
  >
</div>
