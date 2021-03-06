import { createStore } from 'redux';
import moment from 'moment'
let commonState = {
    data: { "name": "Redux Todo" },
    searchTerm: "cricket",
    date: '',
    todo: [],
    today: [],
    previous: [],
    next: [],
    selectedOption: "All",
    todoData: []
};
let redcerFuncrion = (state = commonState, action) => {
    state = { ...state };
    if (action.type === "GET_TODOS") {
        state.todoData = action.payload;
    }
    if (action.type === "CHANGE_NAME") {
        state.searchTerm = action.payload
    }
    if (action.type === "CHANGE_DATE") {
        state.date = action.payload
    }
    if (action.type === "ADD_TODO") {
        let todayDate = moment(new Date()).format("YYYY-MM-DD");
        state.todo = [...state.todo, { task: state.searchTerm, date: state.date }]

        if (todayDate === state.date) {
            state.today = [...state.today, { task: state.searchTerm, date: state.date }]
            console.log("today", state.today)
        }
        else if (state.date > todayDate) {
            state.next = [...state.next, { task: state.searchTerm, date: state.date }]
            console.log("next", state.next)

        }
        else {
            state.previous = [...state.previous, { task: state.searchTerm, date: state.date }]
            console.log("previous", state.previous)

        }
        state.searchTerm = "";
        state.date = "";
    }
    if (action.type === "SELECTED_OPTION") {
        state.selectedOption = action.payload;
    }
    return state;
}
let store = createStore(redcerFuncrion);
export default store;