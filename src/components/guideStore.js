import {writable} from "svelte/store";
import {callApi, getUser} from "../utils/api";
import {counter} from "./stores";


let guidesList = {
    "play": [
        "game_modes",
        "quests",
        "quests_refresh"
    ],
    "solo": [
        "main",
        "play_ad",
        "refresh_data",
        //"quit_lobby", pas sûr que y'a besoin
    ]
}
let guidesOpenedList;
counter.subscribe(async (value) => {
    if (value.refresh === true) return;
    let user = await value.content;
    if(!user) return
    guidesOpenedList = user.user.guidesOpenedList ? user.user.guidesOpenedList : {};
});


function determineCurrentGuide(page) {
    return guidesOpenedList.hasOwnProperty(page) || guidesOpenedList[page]?.length > 1 //if the corresponding page array doesn't exist or has no items
        ? guidesList[page][guidesList[page]
            .indexOf(
                guidesOpenedList[page][guidesOpenedList[page].length - 1] //get last opened guide in guidesOpened array
            ) + 1]
        : guidesList[page][0];
}


let guideHandlerStore = writable({
    page: "",
    list: guidesOpenedList,
    current: false,
});

function guideHandlerSetPage(page) {
    let list;
    guideHandlerStore.subscribe(value => {
       list = value.list;
    });
    guideHandlerStore.set({page: page, list: list, current: determineCurrentGuide(page)});
}

async function goToNextGuide() {
    let data;
    guideHandlerStore.subscribe(value => {
        data = value
    });

    if (!guidesOpenedList.hasOwnProperty(data.page)) {
        guidesOpenedList[data.page] = [];
    }

    guidesOpenedList[data.page].push(data.current)
    guideHandlerStore.set(
        {
            page: data.page,
            list: guidesOpenedList,
            current: guidesList[data.page][guidesList[data.page].indexOf(data.current) + 1],
        }
    );
    await callApi("patch", "/updateGuidesOpenedList", guidesOpenedList);
}

async function goToPreviousGuide() {
    let data;
    guideHandlerStore.subscribe(value => {
        data = value
    });

    guidesOpenedList[data.page].pop(guidesList[data.page][guidesList[data.page].indexOf(data.current) - 1])
    guideHandlerStore.set(
        {
            page: data.page,
            list: guidesOpenedList,
            current: guidesList[data.page][guidesList[data.page].indexOf(data.current) - 1], //set to previous
        }
    );
    await callApi("patch", "/updateGuidesOpenedList", guidesOpenedList);

}

export {guideHandlerStore, guideHandlerSetPage, goToNextGuide, goToPreviousGuide}