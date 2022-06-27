import KanbanAPI from "../API/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column{
    constructor(id, title){
        const topDropZone = DropZone.createDropZone();
        this.elements = {};
        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector(".kanban__column-title");
        // console.log(this.elements.title);
        this.elements.items = this.elements.root.querySelector(".kanban__column-items");
        this.elements.addBtn = this.elements.root.querySelector(".kanban__add-item");
        
        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;

        this.elements.items.appendChild(topDropZone);
        this.elements.addBtn.addEventListener("click", () => {
            /** TODO: Add the item */
            const newItem = KanbanAPI.insertItems(id, "");
            this.render(newItem);
        })
        KanbanAPI.getItems(id).forEach(item => {
            this.render(item);
        })
    }
    // Create the root of column
    static createRoot(){
        const range = document.createRange();
        range.selectNode(document.body);

        return range.createContextualFragment(`
            <li class="kanban__column">
                <div class="kanban__column-title"></div>
                <div class="kanban__column-items">
                </div>
                <button class="kanban__add-item" type="button">+ Add</button>
		    </li>
        `).children[0];
    }
    // Render the item on the UI
    render(data){
        /** TODO: create an item instance */
        const items = new Item(data.id, data.content);
        this.elements.items.appendChild(items.elements.root);
    }
}