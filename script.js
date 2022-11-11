//global inventory
let my_inv = [
    {
        "id": 1,
        "name":"voodka",
        "min": 50,
        "qnt": 30,
        "status": false
    },
    {
        "id": 2,
        "name":"red label",
        "min": 50,
        "qnt": 30,
        "status": false
    },
    {
        "id": 3,
        "name":"gin",
        "min": 50,
        "qnt": 30,
        "status": false
    }
    
]

//Factory pattern para criação de itens
const item_factory = (id, name, min, qnt) => {
    const status = (qnt >= min)
    return{id, name, min, qnt, status}
};

//inv module pattern
const inv = (() => {
    //adds objects to the global inventory
    const add_new_item = (new_item) => {
        if (!my_inv.some(item => item.name.toUpperCase() === new_item.name.toUpperCase())){
            my_inv.push(new_item)
            my_inv.sort((a, b) => a.id - b.id);
        }
        else{
            alert("Error: " + new_item.name + " already exists");
      }
    };
    const store_in_local = () => {
        localStorage.setItem("items", JSON.stringify(my_inv));
    };
    const get_from_local = () => {
        if(localStorage.getItem("items") != null){ 
            my_inv = JSON.parse(localStorage.getItem("items"));
        }
    };
    const assign_id = () => {
        let new_id;
        for(let i = 0; i < my_inv.length; i++){
            if(i + 1 != my_inv[i].id){
                new_id = i + 1;
                break;
            }else{
                new_id =  my_inv.length + 1;
            }
        }
        if(my_inv.length === 0){
            new_id = 1;
        }
        return new_id;
    };
    const increment_item = (increment, id) => {
        if (increment > 0){
            my_inv[id].qnt += parseInt(increment);
            my_inv[id].status = (my_inv[id].min <= my_inv[id].qnt);
        }
    
        inv.store_in_local();
        DOM.load_all();
    };
    const decrement_item = (decrement, id) => {
        if (decrement > 0){
            my_inv[id].qnt -= parseInt(decrement);
            if(!(my_inv[id].min <= my_inv[id].qnt)){
                my_inv[id].status = false;
            }else{
                my_inv[id].status = true;
            }
        }
        inv.store_in_local();
        DOM.load_all();
    }
    const delete_item = function(){

        // Encontra o index do Id no inventario
        const index = my_inv.findIndex(object => {
            console.log(object);
            console.log(this.value);
            return object.id == this.value;
          });

        my_inv.splice(index, 1);
    
        inv.store_in_local();
        DOM.load_all();
    
    };


    return{
        store_in_local,
        get_from_local,
        assign_id,
        add_new_item,
        increment_item,
        decrement_item,
        delete_item
    }
})();


//DOM module pattern
const DOM = (() => {

    const create_card = (item_obj, func) => {

        // Creating all divs for the card
        const item = document.createElement('div');
        const item_right = document.createElement('div');
        const item_left = document.createElement('div');
        const id = document.createElement('div');
        const name = document.createElement('div');
        const min = document.createElement('div'); 
        const qnt = document.createElement('div');
        const status = document.createElement('div');
        const btn = document.createElement('button');
        const input = document.createElement('input');

        // Appending the Card components
        item_left.appendChild(id);
        item_left.appendChild(name);
        item_right.appendChild(min);
        item_right.appendChild(qnt);
        item.appendChild(item_left);
        item.appendChild(item_right);

        // Set div classes
        name.classList.add('name');        
        name.classList.add('text');
        id.classList.add('text');
        min.classList.add('text');
        qnt.classList.add('text');
        status.classList.add('text');
        input.classList.add(`${func}-qnt`);
        item_right.classList.add('item-half');
        item_left.classList.add('item-half');
        item_right.classList.add('item-right');
        item_left.classList.add('item-left');
        item.classList.add('item');
        item.setAttribute('value', item_obj.name);


        // Set properties
        input.type = "number";
        id.textContent =  "#" + item_obj.id;
        name.textContent = item_obj.name;
        min.textContent = item_obj.min;
        qnt.textContent = item_obj.qnt;
        if (item_obj.status === true){
            status.textContent = "Ok"
        }else{
            status.textContent = '⚠'
        }
        
        // del function custom card
        if(func ==='del'){

            // Set SVG Content 
            const svgContent = '<svg fill="white" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="24px" height="24px"><path d="M 24 4 C 20.704135 4 18 6.7041348 18 10 L 11.746094 10 A 1.50015 1.50015 0 0 0 11.476562 9.9785156 A 1.50015 1.50015 0 0 0 11.259766 10 L 7.5 10 A 1.50015 1.50015 0 1 0 7.5 13 L 10 13 L 10 38.5 C 10 41.519774 12.480226 44 15.5 44 L 32.5 44 C 35.519774 44 38 41.519774 38 38.5 L 38 13 L 40.5 13 A 1.50015 1.50015 0 1 0 40.5 10 L 36.746094 10 A 1.50015 1.50015 0 0 0 36.259766 10 L 30 10 C 30 6.7041348 27.295865 4 24 4 z M 24 7 C 25.674135 7 27 8.3258652 27 10 L 21 10 C 21 8.3258652 22.325865 7 24 7 z M 13 13 L 35 13 L 35 38.5 C 35 39.898226 33.898226 41 32.5 41 L 15.5 41 C 14.101774 41 13 39.898226 13 38.5 L 13 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z"/></svg>';

            // Set the HTML value
            btn.innerHTML = svgContent;

            btn.onclick = inv.delete_item
            btn.classList.add('del-btn');
            btn.value = item_obj.id;

            item_right.appendChild(btn);
        }else if(func ==='main'){
            item_right.appendChild(status);

        }else{
            item_right.appendChild(input);
        }   

        return item;

    };
    const add_item = (item_obj, func) => {
        const display= document.querySelector(`#itens-${func}`)
        const card = create_card(item_obj, func);
        display.appendChild(card);
    };

    /// func = ["add", "rm", "del" ,"new"]
    const load_display =  (func) => {
        const parent = document.getElementById(`itens-${func}`);
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        my_inv.forEach(element => {add_item(element, func)});
    };

    const load_all = () => {
        load_display('main');
        load_display('add');
        load_display('rm');
        load_display('del');
    };

    ///func = "add", "new", "rm", "del"
    const open_popup = (func) => {
        document.getElementById(`${func}-popup-background`).style.display = "flex";
    };

    const close_popup = (func) => {
        document.getElementById(`${func}-popup-background`).style.display = "none";
    };

    return{
        load_display,
        load_all,
        open_popup,
        close_popup
    }

})();



// ## Event Listeners ##
//Submit add popup
const btn_send_add = document.querySelector('#send-add')
btn_send_add.addEventListener("click", (e) => {
    e.preventDefault();
    
    const inputs_node_list = document.querySelectorAll('.add-qnt')
    let inputs_value_list = [];

    for (const input of inputs_node_list.values()) {
        inputs_value_list.push(input.value);
        input.value = '';
    }
    for (let i = 0; i < inputs_value_list.length; i++) {
        inv.increment_item(inputs_value_list[i], i)
    }
  
    DOM.close_popup('add')
})
//Submit new popup
const btn_send_new = document.querySelector('#send-new')
btn_send_new.addEventListener("click", (e) => {
    e.preventDefault();

    const new_name = document.querySelector('#new-name')
    const new_min = document.querySelector('#new-min')
    const new_qnt = document.querySelector('#new-qnt')
    const new_id = inv.assign_id();

   if(new_name.value == '' || new_min.value == '' || new_qnt.value == ''){
        alert('Preencha Todos campos')
    }else{
        const new_item = item_factory(new_id, new_name.value, parseInt(new_min.value), parseInt(new_qnt.value))
        inv.add_new_item(new_item);
        inv.store_in_local();
    }
    
    new_name.value = '';
    new_min.value = '';
    new_qnt.value = '';

    DOM.load_all();
    DOM.close_popup('new')
})
//Submit rm popup
const btn_send_rm = document.querySelector('#send-rm')
btn_send_rm.addEventListener("click", (e) => {
    e.preventDefault();

    const inputs_node_list = document.querySelectorAll('.rm-qnt')
    let inputs_value_list = [];

    for (const input of inputs_node_list.values()) {
        inputs_value_list.push(input.value);
        input.value = '';
    }
    for (let i = 0; i < inputs_value_list.length; i++) {
        inv.decrement_item(inputs_value_list[i], i)
    }
  
    DOM.close_popup('rm')
})

const search_input = document.querySelector('#search-input')
search_input.addEventListener('input', (e) =>{
    const filter_value = e.target.value.toUpperCase();
    const li = document.querySelectorAll('.item');

    for(let i = 0; i < li.length; i++){
        a = document.querySelectorAll(".name")[i]
        txt_value = a.textContent;
        if(txt_value.toUpperCase().indexOf(filter_value) > -1){
            li[i].style.display = "";
        }else{
            li[i].style.display = "none";
        }
    }
})


inv.get_from_local();
DOM.load_all();

