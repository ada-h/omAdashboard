const initialState = {
    data : [
        {   
            id: 1,
            year: 2017,           
            color: "steelblue",
            totalIncome: '100,000',
            points: [
                {x: '2019-01-05', y: 1000}, 
                {x: '2019-06-09', y: 3000}, 
                {x: '2019-10-10', y: 8000}
            ] 
        },
        {
            id: 2,
            year: 2018,
            color: "steelblue",
            totalIncome: '200,000',
            points: [
                {x: '2018-01-01', y: 1000}, 
                {x: '2018-03-09', y: 3000}, 
                {x: '2018-04-19', y: 0},
                {x: '2018-12-21', y: 3000}, 
                {x: '2018-12-25', y: 7000},
            ] 
        },
        {
            id: 3,
            year: 2019, 
            color: "steelblue",
            totalIncome: '500,000',
            points: [
                {x: '2019-01-09', y: 1000}, 
                {x: '2019-02-12', y: 3000}, 
                {x: '2019-03-20', y: 0},
                {x: '2019-03-30', y: 3000},  
            ] 
        }
    ]
}

const rootreducer = (state = initialState, action) =>{
   if (action.type === 'YEAR_GRAPH'){
       console.log (action.value)
        // let data = state.data.find(data => 
        // action.selectedYearValue === data.year)
        // return{
        //     ...state,
        //     data: data
        // }
   }
    return state
}

export default rootreducer