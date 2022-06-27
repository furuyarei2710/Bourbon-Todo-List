import KanbanAPI from "../API/KanbanAPI.js";

export default class DropZone{
    static createDropZone(){
        const range = document.createRange();
        range.selectNode(document.body);

        const dropZone = range.createContextualFragment(`
            <div class="kanban__dropZone"></div> 
        `).children[0];

        dropZone.addEventListener("dragover", e => {
            e.preventDefault()
            dropZone.classList.add("kanban__dropZone--active");
        })
        dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove("kanban__dropZone--active");
        })
        dropZone.addEventListener("drop", e => {
            e.preventDefault();
            dropZone.classList.remove("kanban__dropZone--active");

            const columnElement = dropZone.closest(".kanban__column");
            const columnID = Number(columnElement.dataset.id);
            const dropZoneInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropZone"));
            const droppedIndex = dropZoneInColumn.indexOf(dropZone);
            // itemID of element that you will drag and drop
            const itemID = Number(e.dataTransfer.getData("text/plain"));
            const droppedItemElement = document.querySelector(`[data-id = "${itemID}"]`);
            const insertAfter = dropZone.parentElement.classList.contains("kanban__item") ? dropZone.parentElement : dropZone;
            
            // If user drag to its own dropZone
            if(droppedItemElement.contains(dropZone)){
                return;
            }
            insertAfter.after(droppedItemElement);
            // Update the API in local storage after drop element 
            KanbanAPI.updateItems(itemID, {
                columnID,
                position: droppedIndex
            })
            // console.log([columnElement, columnID]);
            console.log(droppedItemElement);
        })

        return dropZone;
    }
}