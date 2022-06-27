import KanbanAPI from "./API/KanbanAPI.js";
import Kanban from "./view/Kanban.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

new Kanban($('.kanban'));

// console.log(KanbanAPI.getItems(1)); 
// console.log(KanbanAPI.insertItems(1, "Coding"));
// KanbanAPI.updateItems(23044, {"columnID": 1, position: 2, "content": "Coding OOP"});
// KanbanAPI.deleteItems(22899);
