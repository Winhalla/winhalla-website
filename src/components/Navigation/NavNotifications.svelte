<script>
    import { clickOutside } from "../../utils/clickOutside";
    import { callApi } from "../../utils/api.js";
    import { onMount } from "svelte";
    import cookie from "cookie";
    import { counter } from "../store";

    export let data;
    let newNotifications = false;
    let opened = false;
    let isDropdownOpen = false;
    let matchesLength;

    function handleClick() {
        isDropdownOpen = !isDropdownOpen;
        opened = true;
    }

    function calculateTimers() {
        data.inGame.forEach((match, i) => {
            let d = new Date(match.Date);
            const endsIn = -(
                (new Date().getTime() -
                    new Date(d.setHours(d.getHours() + 3)).getTime()) /
                1000
            );
            if (endsIn < 1) {
                data.inGame[i].timer = "";
            } else {
                startTimer(endsIn, i);
            }
        });
    }

    onMount(() => {
        if (!data.notifications) return;

        let length = data.notifications.length;
        let cookies = cookie.parse(document.cookie);

        if (length > cookies.notificationNb || !cookies.notificationNb) {
            newNotifications = true;
        }

        cookies.notificationNb = length;
        matchesLength = data.inGame.length;
        calculateTimers();

        //document.cookie = cookie.serialize("notificationNb",cookies.notificationNb,{maxAge:15552000,sameSite:"lax"})
        //document.cookie = cookie.serialize(cookies)
    });
    //TODO: on peut opti ça en utilisant la data de export let data au lieu de resubscribe pour save de la ram
    counter.subscribe(() => {
        if (data.inGame) {
            if (data.inGame.length !== matchesLength) {
                calculateTimers();
            }
        }
    });

    function startTimer(duration, i) {
        let timer = duration,
            hours,
            minutes,
            seconds;
        setInterval(function() {
            seconds = Math.floor(timer % 60);
            minutes = Math.floor((timer / 60) % 60);
            hours = Math.floor(timer / (60 * 60));

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            data.inGame[i].timer = hours + ":" + minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }

    const idToType = id => {
        if (id === 0) return "match finished";
        if (id === 1) return "quest finished";
        if (id === 2) return "match";
    };

    function delNotif(id,index) {
        callApi("post", "/deleteNotification/" + id);
        data.notifications.splice(index, 1);
        data = data;
    }
</script>

<style>
    .dropdown {
        top: 3.8rem;
    }

    .bell-button:hover .bell {
        display: none;
    }

    .bell-button:hover .bell-hover {
        display: block;
    }

    .notification {
        border-radius: 10px;
        @apply flex justify-between px-4 py-3 mt-3 mb-1 relative overflow-hidden w-full;
    }
</style>

<div class="relative">
    <div class="flex items-center h-full mr-4 lg:m-0">
        <div
            class="focus:outline-none lg:ml-3 rounded bell-button cursor-pointer"
            on:click={() => {
                document.cookie = cookie.serialize(
                    'notificationNb',
                    data.notifications.length,
                    { maxAge: 15552000, sameSite: 'lax', path: '/' }
                );
                newNotifications = false;
            }}
            on:click={handleClick}>
            <div class="flex items-center relative">
                {#if isDropdownOpen}
                    <svg
                        class="pt-1 w-5 lg:p-0 fill-current"
                        viewBox="0 0 21 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m20.333 17.16c-1.04-1.04-2.339-2.341-2.339-7.409
                            0-3.706-2.688-6.784-6.22-7.393l-.045-.006c.166-.238.265-.533.265-.851
                            0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0
                            .318.099.613.268.856l-.003-.005c-3.578.614-6.266
                            3.692-6.266 7.399 0 5.068-1.296 6.367-2.339
                            7.409-.405.407-.655.968-.655 1.588 0 1.242 1.005
                            2.249 2.246 2.252h5.249c0 1.657 1.343 3 3 3s3-1.343
                            3-3h5.248c1.241-.004 2.246-1.011 2.246-2.252
                            0-.62-.25-1.181-.655-1.588zm-9.84 4.965c.207 0
                            .375.168.375.375s-.168.375-.375.375c-1.035-.001-1.874-.84-1.875-1.875h.75c.001.621.505
                            1.125 1.126 1.125z" />
                    </svg>
                {:else}
                    <svg
                        class="pt-1 w-5 lg:p-0 fill-current bell"
                        viewBox="0 0 21 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m19.945
                            15.512c-.8-.786-1.619-1.6-1.619-5.44-.005-3.881-2.832-7.101-6.539-7.717l-.046-.006c.165-.237.263-.531.263-.848
                            0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0
                            .317.098.611.266.853l-.003-.005c-3.753.623-6.579
                            3.843-6.584 7.723v.001c0 3.84-.822 4.655-1.619
                            5.44-.653.577-1.062 1.417-1.062 2.352 0 1.732 1.404
                            3.135 3.135 3.135h.007 4.36c0 1.657 1.343 3 3
                            3s3-1.343 3-3h4.363.007c1.732 0 3.135-1.404
                            3.135-3.135
                            0-.935-.409-1.775-1.059-2.349l-.003-.003zm-9.441
                            6.613c-.621-.001-1.124-.504-1.125-1.125h2.251c-.001.621-.505
                            1.125-1.126
                            1.125zm7.36-3.376h-14.726c-.487-.003-.881-.398-.881-.886
                            0-.243.098-.463.256-.623 1.34-1.34 2.418-2.612
                            2.418-7.17 0-3.077 2.495-5.572 5.572-5.572s5.572
                            2.495 5.572 5.572c0 4.578 1.089 5.84 2.418
                            7.17.158.16.256.38.256.623 0 .488-.394.883-.881.886z" />
                    </svg>
                    <svg
                        class="pt-1 w-5 lg:p-0 fill-current hidden bell-hover"
                        viewBox="0 0 21 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m20.333 17.16c-1.04-1.04-2.339-2.341-2.339-7.409
                            0-3.706-2.688-6.784-6.22-7.393l-.045-.006c.166-.238.265-.533.265-.851
                            0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0
                            .318.099.613.268.856l-.003-.005c-3.578.614-6.266
                            3.692-6.266 7.399 0 5.068-1.296 6.367-2.339
                            7.409-.405.407-.655.968-.655 1.588 0 1.242 1.005
                            2.249 2.246 2.252h5.249c0 1.657 1.343 3 3 3s3-1.343
                            3-3h5.248c1.241-.004 2.246-1.011 2.246-2.252
                            0-.62-.25-1.181-.655-1.588zm-9.84 4.965c.207 0
                            .375.168.375.375s-.168.375-.375.375c-1.035-.001-1.874-.84-1.875-1.875h.75c.001.621.505
                            1.125 1.126 1.125z" />
                    </svg>
                {/if}
                {#if newNotifications}
                    <span class="flex">
                        <span
                            class="inline-flex animate-ping absolute top-0
                            right-0 w-2 h-2 rounded-full bg-legendary opacity-75" />
                        <span
                            class="inline-flex absolute top-0 right-0 w-2 h-2
                            rounded-full bg-legendary" />
                    </span>
                {/if}
            </div>
        </div>
    </div>

    <div
        class:hidden={!isDropdownOpen}
        class="pt-2 py-1 lg:py-2 px-2 lg:px-3 rounded-lg bg-background absolute
        shadow-card dropdown -right-10 md:right-0 z-50 w-86 lg:w-92 border
        border-primary overflow-y-auto max-h-screen-60 scrollbar"
        use:clickOutside
        on:click_outside={() => (isDropdownOpen = false)}>
        <div>
            {#if data.notifications}
                <div
                    on:click={() => {
                        setTimeout(() => {
                            if (opened === true) {
                                document.cookie = cookie.serialize(
                                    'notificationNb',
                                    data.notifications.length,
                                    {
                                        maxAge: 15552000,
                                        sameSite: 'lax',
                                        path: '/'
                                    }
                                );
                                newNotifications = false;
                            }
                        }, 10);
                    }}>
                    <p class="ml-1">Notifications</p>
                    <div>
                        {#each data.notifications as notification, i}
                            <a href="/{notification.id === 0?`play/ffa/${notification.matchId}`:notification.id === 1?'play':''}"
                                class="card notification flex items-center
                                relative" class:cursor-default={notification.id === 2}>
                                <div class="progress-container">
                                    <p class="mr-6 lg:mr-12 text-2xl">
                                        {notification.message}
                                    </p>
                                    {#if notification.tip}
                                        <p
                                            class=" mr-6 lg:mr-12 text-light
                                            text-lg">
                                            {notification.tip}
                                        </p>
                                    {/if}
                                </div>
                                <span
                                    class="quest-goal text-sm text-font px-2
                                    py-1 bg-legendary rounded-lg b">
                                    {idToType(notification.id)}
                                </span>
                                <button
                                    on:click={() => delNotif(notification._id,i)}
                                    class="p-2 absolute top-0 right-0 text-light
                                    hover:text-font">
                                    <svg
                                        class="w-3 h-3 fill-current "
                                        viewBox="0 0 28 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="m24 2.4-2.4-2.4-9.6
                                            9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6
                                            2.4 2.4 9.6-9.6 9.6 9.6
                                            2.4-2.4-9.6-9.6z" />
                                    </svg>
                                </button>
                            </a>
                        {/each}
                    </div>
                </div>
            {/if}
            {#if data.inGame}
                <div class="mt-5">
                    <p class="ml-1">Matchs in progress</p>
                    <div>
                        {#each data.inGame as match}
                            <a
                                class="card notification flex items-center"
                                href="/play/ffa/{match.id}">
                                <div class="progress-container">
                                    <p class="ml-2 mr-6 lg:mr-12 text-2xl">
                                        {match.type}
                                    </p>
                                    <p
                                        class="ml-2 mr-6 lg:mr-12 text-light
                                        text-lg">
                                        {match.timer}
                                    </p>
                                </div>
                                <p class="quest-goal text-xl text-primary">
                                    <!--{#if match.hasStarted}{/if}-->
                                    {!match.isFinished ? match.progress + '/8' : 'Waiting for others to finish'}
                                </p>
                            </a>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
