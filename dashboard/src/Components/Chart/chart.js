import React, {Component} from 'react'
import Chart from "chart.js";
import './charts.css'
import axios from 'axios'
import moment from 'moment';


class Layout extends Component{
  constructor(props) {
    super(props);
    this.state = {
        value: '2019',
        month: '01',
        data : [],
        apiData: [],
        months: [
          "01", "02",  "03", "04", "05", "06", "07", "08", "09", "10","11","12"],
        years: {}
    }
    this.handleTrips = this.handleTrips.bind(this)
    this.handleYearChange = this.handleYearChange.bind(this)
    this.handleMonthChange = this.handleMonthChange.bind(this)
    this.handleAll = this.handleAll.bind(this)
    
  }

  componentWillMount(){
      
    //Sending a get request to the api
      axios.get('http://api.oma.ng/api/Admin/getadminchart')
      .then(res =>{
        this.setState({
          apiData: res.data.data.chartIncomeViewModels,
          data: res.data.data,
          value: new Date().getFullYear().toString()
        })
      }).then(() =>{
        this.processData();
      })
        
      .catch(error => {
        console.log(error);
    });
  
  }

  processData(){
    
   //Getting the value for the current month in the year in the format i want
   let now = new Date()
   let thisMonth = this.state.months[now.getMonth()]
        
        //Getting only unique dates 
        let filteredMonth = this.state.data.chartIncomeViewModels.filter(data=>
          data.date.slice(5,7) === thisMonth & data.date.slice(0,4) === this.state.value
        ).map(mapFiltered => mapFiltered.date.slice(0,10, 'filtered'))

        let uniqueDate = Array.from(new Set(filteredMonth));
        
            
            //returning all income in the api for the month
            let raw = this.state.data.chartIncomeViewModels;
              let MonthlyIncome = [];
            for(let j in uniqueDate){
              let sum = 0;
              let day = moment(uniqueDate[j]).format('MM-DD-YYYY').toString();
              for(let i in raw){       
                if(day === moment(raw[i].date).format('MM-DD-YYYY').toString()){     
                  sum+=raw[i].income;
                }
              }
              MonthlyIncome.push(sum)
            
            }      
        
          //Using the ChartJs library to plot my Graph for that month      
          const node = this.node;
          new Chart(node, {
            type: "line",
            options: {
              title: {
                  display: true,
                  text: 'Graph of Income Against Month',
                  fontSize: 18,
                  fontColor: '#ccd9e8',
              },
              tooltips: {
                  mode: 'point'
              }
              },
            data: {
              labels: uniqueDate,
              datasets: [
                {
                  label: "Income-Date",
                  data: MonthlyIncome,
                  backgroundColor: "steelblue"
                }
              ]
            }
          });
   
  }

  handleTrips(e){
    e.preventDefault()

          //returning all dates in the api
          let allYears = this.state.data.chartTripsViewModels.map(data=>
            data.date.slice(0,10)
          )
    
          //Getting only unique dates 
          let uniqueDate = Array.from(new Set(allYears));
          
          //returning all trips from the api
          let raw = this.state.data.chartTripsViewModels;
            let allTrips = [];
          for(let j in uniqueDate){
            let sum = 0;
            let day = moment(uniqueDate[j]).format('MM-DD-YYYY').toString();
            for(let i in raw){       
              if(day === moment(raw[i].date).format('MM-DD-YYYY').toString()){     
                sum+=raw[i].trips;
              }
            }
            allTrips.push(sum)
          
          }      
          const node = this.node;       
           new Chart(node, {
            type: "line",
            options: {
              title: {
                  display: true,
                  text: 'Graph of All Data from Database',
                  fontSize: 18,
                  fontColor: '#ccd9e8',
              },
              tooltips: {
                  mode: 'point'
              }
              },
            data: {
              labels: uniqueDate,
              datasets: [
                {
                  label: "Trips",
                  data: allTrips,
                  backgroundColor: "steelblue"
                }
              ]
            }
          });
  }

  handleYearChange (e){
    //Setting the clicked year value to the state
    let value =  e.target.value
    
    this.setState({value})
    
    //Filtering through the state for the selected Year
      const filteredYear = this.state.data.chartIncomeViewModels.filter(data=>
      data.date.slice(0,4) === value
      )

      //Total Income for every month of the year
      let monthSumArray = [] 
      
      for(let i =0; i < 12; i++){
        let filteredMonth = filteredYear.filter(data=>      
          parseInt(data.date.slice(5,7)) === (i + 1)
          )
          let summedIncome = 0.0
         for (let k = 0; k <filteredMonth.length; k++){
          summedIncome =summedIncome +filteredMonth[k].income
         }
         monthSumArray.push(summedIncome)
      }

      // Total Income for the year
      let totalIncome = 0;
      for(let i =0 ; i < filteredYear.length; i++){
        totalIncome += filteredYear[i].income
      }

        const node = this.node;
      //The line chart for Each Year

        new Chart(node, {
          type: "line",
          options: {
            title: {
                display: true,
                text: totalIncome,
                fontSize: 18,
                fontColor: '#ccd9e8',
            },
            tooltips: {
                mode: 'point'
            }
            },
          data: {
            labels: [
             "January", "February",  "March", "April", "May", "June", "July", "August", "September",
             "October", "November", "December"], 
            datasets: [
              {
                label: "Income-Date",
                data: monthSumArray,
                backgroundColor: "steelblue"
              }
            ]
          }
        });
  }

  handleMonthChange(e){ 
    
    let month =  e.target.value
    //Setting the clicked month in the state
    this.setState({
      month,
    });

    //Filtering through our data for selected month    
    let filteredMonth = this.state.data.chartIncomeViewModels.filter(data=>
      data.date.slice(5, 7) === month & data.date.slice(0,4) === this.state.value
    ).map(mapFiltered => mapFiltered.date.slice(0,10))
    
    //Getting only unique dates 
    let uniqueDate = Array.from(new Set(filteredMonth));
    
        
        //returning all income in the api
        let raw = this.state.data.chartIncomeViewModels;
          let MonthlyIncome = [];
        for(let j in uniqueDate){
          let sum = 0;
          let day = moment(uniqueDate[j]).format('MM-DD-YYYY').toString();
          for(let i in raw){       
            if(day === moment(raw[i].date).format('MM-DD-YYYY').toString()){     
              sum+=raw[i].income;
            }
          }
          MonthlyIncome.push(sum)
        
        }      
    
      //Using the ChartJs library to plot my Graph for that month      
      const node = this.node;
      new Chart(node, {
        type: "line",
        options: {
          title: {
              display: true,
              text: 'Graph of Income Against Month',
              fontSize: 18,
              fontColor: '#ccd9e8',
          },
          tooltips: {
              mode: 'point'
          }
          },
        data: {
          labels: uniqueDate,
          datasets: [
            {
              label: "Income-Date",
              data: MonthlyIncome,
              backgroundColor: "steelblue"
            }
          ]
        }
      });
  }

  handleAll(e){
      e.preventDefault()

      //returning all dates in the api
      let allYears = this.state.data.chartIncomeViewModels.map(data=>
        data.date.slice(0,10)
      )

      //Getting only unique dates 
      let uniqueDate = Array.from(new Set(allYears));
      
      //returning all income in the api
      let raw = this.state.data.chartIncomeViewModels;
        let allIncome = [];
      for(let j in uniqueDate){
        let sum = 0;
        let day = moment(uniqueDate[j]).format('MM-DD-YYYY').toString();
        for(let i in raw){       
          if(day === moment(raw[i].date).format('MM-DD-YYYY').toString()){     
            sum+=raw[i].income;
          }
        }
        allIncome.push(sum)
      
      }      
        console.log(allIncome);
      const node = this.node;
        
      new Chart(node, {
        type: "line",
        options: {
          title: {
              display: true,
              text: 'Graph of All Data from Database',
              fontSize: 18,
              fontColor: '#ccd9e8',
          },
          tooltips: {
              mode: 'point'
          }
          },
        data: {
          labels: uniqueDate,
          datasets: [
            {
              label: "Income",
              data: allIncome,
              backgroundColor: "steelblue"
            }
          ]
        }
      });
  }

  render() {
    
    return (
      <div className= 'App card'>
      <form className = 'select'>
            <select 
             className = 'monthly' 
             onChange = {this.handleYearChange}
            > 
                <option value = '2019'> 2019 </option>
                <option value = '2018'> 2018 </option>
                <option value = '2017'> 2017 </option>
            </select>
            <select 
             className = 'monthly'  
             onChange = {this.handleMonthChange}
            > 
                <option value = '01'> January </option>
                <option value = '02'> February </option>
                <option value = '03'> March </option>
                <option value = '04'> April </option>
                <option value = '05'> May </option>
                <option value = '06'> June </option>
                <option value = '07'> July </option>
                <option value = '08'> August </option>
                <option value = '09'> September </option>
                <option value = '10'> October </option>
                <option value = '11'> November </option>
                <option value = '12'> December </option>
            </select>
            <button className = 'monthly' onClick = {this.handleAll}> Show All</button>
            <button className = 'monthly' onClick = {this.handleTrips}> Trips</button>
      </form>
        <canvas
          style={{ width: 800, height: 300 }}
          ref={node => (this.node = node)}
        />
      </div>
    );
  }
}

export default Layout;