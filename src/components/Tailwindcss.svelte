<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .ppMask {
        opacity: 0.05;
    }

    .button {
        display: inline-block;
        padding: 0.75rem 2.5rem;
        border-radius: 0.25rem;
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

    .card {
        -webkit-box-shadow: rgba(0, 0, 0, 0.125) 0px 0px 8px;
        box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 8px;
        @apply bg-variant rounded-2xl;
    }

    .scrollbar::-webkit-scrollbar {
        width: 18px;
        height: 18px;
        cursor: pointer;

        /*background-color: rgba(229, 231, 235, var(--bg-opacity));*/

    }

    .scrollbar::-webkit-scrollbar-thumb {
        height: 3px;
        border: 6px solid rgba(0, 0, 0, 0);
        background-clip: padding-box;
        -webkit-border-radius: 15px;
        background-color: #1b1b27;
        -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
        /*outline: 1px solid slategrey;*/
    }

    .scrollbar-background::-webkit-scrollbar-thumb {
        background-color: #17171a;
    }
</style>
