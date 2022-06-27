import DropZone from "./DropZone.js";
import KanbanAPI from "../API/KanbanAPI.js";

export default class Item{
    constructor(id, content){
        const bottomDropZone = DropZone.createDropZone();
        
        this.elements = {};
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban__item-input");

        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        // Update the content when user intend to modify
        this.content = content;
        this.elements.root.appendChild(bottomDropZone);

        const onBlur = () => {
            const newContent = this.elements.input.textContent.trim();
            
            if(newContent == this.content){
                return;
            }
            this.content = newContent;
            // Call API to update the current item in the local storage
            KanbanAPI.updateItems(id, {
                content: this.content
            });
        };

        this.elements.input.addEventListener("blur", onBlur);
        this.elements.input.addEventListener("dblclick", () => {
            const check = confirm("Are you sure you intend to delete this item ?");
            if(check){
                KanbanAPI.deleteItems(id);
                this.elements.input.removeEventListener("blur", onBlur);
                this.elements.input.parentElement.removeChild(this.elements.input);
            }
        })

        // Drag and drop 
        this.elements.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData('text/plain', id);
            // this.elements.root.classList.add("dragging");
        })
        // Prevent the item ID fall into the target input 
        this.elements.input.addEventListener("drop", (e) => {
            e.preventDefault();
        })
    }
    static createRoot(){
        const range = document.createRange();
        range.selectNode(document.body);
        
        return range.createContextualFragment(`
        <div class="kanban__item" draggable="true">
            <textarea type='text' class="kanban__item-input" placeholder = 'Enter your task'></textarea>
        </div>
        `).children[0];
    }

}