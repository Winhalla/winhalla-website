<script>
    import { clickOutside } from "../../utils/clickOutside";
    import { apiUrl } from "../../utils/config";

    export let username;
    export let avatar;

    let isDropdownOpen;
    const handleClick = () => {
        isDropdownOpen = !isDropdownOpen;
    };
</script>

<style>
    .username {
        margin-left: 0.4rem;
    }

    .dropdown {
        top: 3.8rem;
        left: 0;
        right: 0;
    }
</style>
<div class="lg:relative">
    <div class="flex items-center h-full">
        <button
            class="focus:outline-none lg:hover:bg-primary lg:px-2 py-1 rounded"
            use:clickOutside
            on:click_outside={() => (isDropdownOpen = false)}
            on:click={() => handleClick()}>
            <div class="flex items-center">
                <img class="w-10 h-10 rounded-full" src={avatar} alt="Avatar" />
                <p class="text-xl mr-2 username">{username}</p>
                <svg
                    class="w-4 h-6 fill-current hidden lg:block"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z" />
                </svg>
            </div>
        </button>
    </div>

    <div
        class:lg:hidden={!isDropdownOpen}
        class="pt-3 lg:pt-0 rounded lg:bg-variant lg:absolute lg:shadow-card
            dropdown z-50 lg:border lg:border-primary">
        <a class="block text-lg border-l border-red-600 py-3
                lg:hover:bg-primary lg:hover:text-font px-3 rounded-sm
                lg:border-none" href="/referral-link?visible=true">Affiliation link</a>
        <a
            class="block text-red-500 text-lg border-l border-red-600 py-3
                lg:hover:bg-red-500 lg:hover:text-font px-3 rounded-sm
                lg:border-none mb-3 lg:mb-0"
            href="{apiUrl}/auth/logout">Logout</a>

    </div>
</div>