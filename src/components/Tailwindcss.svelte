<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .button {
        display: inline-block;
        padding: 0.5rem 2.75rem;
        border-radius: 0.125rem;
        font-size: 1.25rem;
        background-color: #3d72e4;
    }

    .button-brand:hover {
        -webkit-box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
        box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
    }

    .button-brand-alternative {
        background-color: #1a1a21;
        -webkit-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
        border: 1px solid #3d72e4;
    }

    .button-brand-alternative:hover {
        -webkit-box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.125);
        box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.125);
    }

    .refresh-button {
        @apply flex px-7 items-center;
    }

    .refresh-button div {
        margin-top: -0.185rem;
    }
    .refresh-button svg {
        @apply fill-current text-font w-5 animate-spin left-4;
    }

    .card {
        -webkit-box-shadow: rgba(0, 0, 0, 0.125) 0px 0px 8px;
        box-shadow: rgba(0, 0, 0, 0.125) 0px 0px 8px;

        @apply bg-variant rounded;
    }
</style>
