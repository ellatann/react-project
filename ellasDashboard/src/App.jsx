import React, { useState } from 'react'
import './App.css'
import { render } from 'react-dom'
function Dashboard(){
    return(
        <div>
        <Title/>
        <ToDoList/>
        <Weather/>
        </div>
    );
}
function Title(){
    return(
        <div className = "Title">
            <h1>Ella's Dashboard </h1>
            </div>
    );
    
}
//Interactive ToDo List, clickable
class ToDoList extends React.Component{
    constructor(props){
        //super calls constructor of the class
        super(props)
        //stores array of items to call on
        this.state = {
         todos: ["Pack lunch","Bring water","Eat breakfast"]
        }
    }
    //makes code show up on screen
    render(){
        console.log(this.state.todos)
        return (
            <div className = "box">
                <h2>To-Do List</h2> 
                {this.state.todos.map((toDo, i)=> <ToDo item={toDo} key={toDo+i} />)}

            </div>
        )
    }
}
//individual items inside To Do list
class ToDo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            className: ""
        }
    }
    crossOutTodo = ()=>{
        //leaves item uncrossed
        if (this.state.className){
            this.setState({
                className: ""
            })
        }
        //crosses out item
        else {
            this.setState ({
                className: "crossout"
            })
        }  
    }
    render() {
        //makes the buttons show up
        return(
        <div>
            <button onClick = {this.crossOutTodo}></button>
            <span className = {this.state.className}>{this.props.item}</span>
        </div>
        )
    }
}
//gets the weather data
async function fetchWeatherData() {
    const data = await fetch("https://api.weather.gov/gridpoints/MTR/86,95/forecast")
    return data.json()
}
//shows the temperature and forecast
class Weather extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            temp: 0,
            forecast: ""
        }
    }
    componentDidMount() {
        this.updateWeatherData()
        setInterval(this.updateWeatherData,100000)
    }
    //takes data and updates it by changing the state of the items from the array
    updateWeatherData(){
        fetchWeatherData().then(data=>{
          console.log(data)
          const todayForecast = data.properties.periods[0]
          this.setState({
            temp: todayForecast.temperature,
            forecast: todayForecast.shortForecast
          })
          console.log(this.state.temp)
        })
    }     
    
    render (){
        //displays weather
        return(
            <div className = "sideBox">
                <h2>Weather Forcast</h2>
                <p>Temperature: {this.state.temp}</p>
                <p> Forecast: {this.state.forecast}</p>
            </div>
        )
    }
}

export default Dashboard



