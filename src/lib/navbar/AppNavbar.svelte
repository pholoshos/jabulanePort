<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input } from 'flowbite-svelte';
    import { SearchOutline } from 'flowbite-svelte-icons';
  </script>
  
  <Navbar>
    <NavBrand href="/">
      <img src="/logo.jpeg" class="mr-3 h-6 sm:h-9" alt="Splearn" />
      <span class="self-center whitespace-nowrap text-xl font-semibold  dark:text-white">Splearn</span>
    </NavBrand>
    <div class="flex md:order-2 ">
      <Button color="none" data-collapse-toggle="mobile-menu-3" aria-controls="mobile-menu-3" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
        <SearchOutline class="w-5 h-5" />
      </Button>
      <div class="hidden relative md:block">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <SearchOutline class="w-4 h-4" />
        </div>
        <Input id="search-navbar" class="pl-10" placeholder="Search..." />
      </div>
      <NavHamburger />
    </div>
    <NavUl>
      <NavLi href="/" active={true}>Home</NavLi>
      <NavLi href="/about">Notifications</NavLi>
      <NavLi href="/grades">Grades</NavLi>
    </NavUl>
  </Navbar>