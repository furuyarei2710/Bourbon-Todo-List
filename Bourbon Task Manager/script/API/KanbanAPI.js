export default class KanbanAPI{
    // Get item of column
    static getItems(columnID){
        const column = read().find(column => column.id == columnID); 
        if(!column){
            return [];
        }
        return column.items;
    }
    // Insert new item to column
    static insertItems(columnID, newContent){
        const data = read();
        const column = data.find(column => column.id == columnID);
        const item = {
            id: Math.floor(Math.random() * 100000),
            newContent
        }
        if(!column){
            throw new Error("The column does not exist !");
        }
        column.items.push(item);
        save(data);

        return item;
    }
    // Update the new content of new item in columns
    static updateItems(itemID, newProperties){
        const data = read();
        // Using array destructuring
        const [item, currentColumn] = (() => {
            for(const column of data){
                const item = column.items.find(item => item.id == itemID);
                if(item){
                    // return [item, column];
                    return [item, column];
                }
            }
        })();
        if(!item){
            throw new Error("The item that you're founding does not exist !!!");
        }
        // Update the content of item
        item.content = newProperties.content == undefined ? item.content : newProperties.content;

        if(newProperties.columnID !== undefined && newProperties.position !== undefined){
            const targetColumn = data.find(column => column.id == newProperties.columnID);

            if(!targetColumn)
                throw new Error("Target column not found !!!");

            // Remove the position of current item 
            currentColumn.items.splice(currentColumn.items.indexOf(item));
            // Append the item to the position updated in the target column
            targetColumn.items.splice(newProperties.position, 0, item);
        }

        save(data)

        // console.log([item, currentColumn]);
    }
    // Delete the item by its ID
    static deleteItems(itemID){
        const data = read();
        for(const column of data){
            const item = column.items.find(item => item.id == itemID);
            
            if(item){
                column.items.splice(column.items.indexOf(item), 1);
            }
        }
        save(data);
    }
}

// Read data from local Storage 
function read(){
    const json = localStorage.getItem("kanbanData");
    if(!json){
        return [
            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            },
        ]
    }
    return JSON.parse(json);
}
// Save data into local storage
function save(data){
    localStorage.setItem("kanbanData", JSON.stringify(data));
}
