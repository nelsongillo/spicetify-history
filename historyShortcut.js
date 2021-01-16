(function HistoryShortcut() {

    const { CosmosAPI, Player, LocalStorage, PlaybackControl, ContextMenu, URI } = Spicetify
    if (!(CosmosAPI && Player && LocalStorage && PlaybackControl && ContextMenu && URI)) {
        setTimeout(HistoryShortcut, 300)
        return
    }

    const ITEM_LABEL = "History"
    const ITEM_ID = "historyShortcut"

    // Get Sidebar Lists
    var topicList = document.getElementsByClassName("SidebarList__list")
    if (topicList) {
        // Add to first in list
        // On default layout this would be the Home/Browse/Radio List
        topicList[0].appendChild(createHistoyItem())
    } else {
        return
    }

    const toCheckMutate = document.getElementById('view-content');
    const config = { attributes: true, childList: true, subtree: true };

    let observerCallback = function(changes, _) {
        appQueue = document.getElementById("app-queue")
        if (!appQueue){ return }
        
        if (appQueue.getAttribute("class") === "active"
            && appQueue.getAttribute("data-app-uri") === "spotify:app:queue:history"
        ) {
            onClickHistory()
        } else {
            onLeaveHistory()
        }
    };

    let observer = new MutationObserver(observerCallback)
    observer.observe(toCheckMutate, config)

    // Deactivate Selected Status for History Item
    function onLeaveHistory() {
        item = document.getElementById(ITEM_ID)
        item.setAttribute("class", "SidebarListItem")
    }

    // Activate Selected Status for History Item
    function onClickHistory() {
        item = document.getElementById(ITEM_ID)
        item.setAttribute("class", "SidebarListItem SidebarListItem--is-active")
    }

    // Construct the List Item
    function createHistoyItem() {
        /* List Item
        *  <li class="SidebarListItem">
        */
        let listItem = document.createElement("li")
        listItem.setAttribute("class", "SidebarListItem")
        listItem.setAttribute("id", ITEM_ID)

        /* Outer Div Element
        *  <div class="DropTarget SidebarListItem__drop-target DropTarget--tracks DropTarget--albums DropTarget--artists DropTarget--playlists">
        */
        let outer = document.createElement("div")
        outer.setAttribute("class", "DropTarget SidebarListItem__drop-target DropTarget--tracks DropTarget--albums DropTarget--artists DropTarget--playlists")

        /* Middle Div Element
        *  <div class="SidebarListItem__inner">
        */
        let inner = document.createElement("div")
        inner.setAttribute("class", "SidebarListItem__inner")

        /* Link Div Element
        *  <div class="SidebarListItem__link">
        */
        let link = document.createElement("div")
        link.setAttribute("class", "SidebarListItem__link")

        /* Anker
        * <a class="SidebarListItemLink SidebarListItemLink--tall spoticon-time-24"
        *    draggable="false"
        *    href="spotify:app:queue:history"
        *    data-sidebar-list-item-uri="spotify:app:queue:history"
        *    data-ta-id="sidebar-list-item-link">
        */
        anker = document.createElement("a")
        anker.setAttribute("class", "SidebarListItemLink SidebarListItemLink--tall spoticon-time-24")
        anker.setAttribute("draggable", "false")
        anker.setAttribute("href", "spotify:app:queue:history")
        anker.setAttribute("data-sidebar-list-item-uri", "spotify:app:queue:history")
        anker.setAttribute("data-ta-id", "sidebar-list-item-link")

        /* Item Text
        *  <span class="SidebarListItem__label"
        *        dir="auto">
        *            History
        *  </span>
        */
        span = document.createElement("span")
        span.setAttribute("class", "SidebarListItem__label")
        span.setAttribute("dir", "auto")
        span.textContent = ITEM_LABEL


        anker.appendChild(span)
        link.appendChild(anker)
        inner.appendChild(link)
        outer.appendChild(inner)
        listItem.appendChild(outer)

        listItem.addEventListener("click", onClickHistory)


        return listItem
    }
})();