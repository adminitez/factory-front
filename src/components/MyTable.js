import React from 'react';

export default class MyTable extends React.Component{


    handleClick(car){
        alert('Clicou ' + car);
    } 

    render() {
        const cars = ['fusca', 'jetta', 'sandero'];
        return (
 
        <table style={{color:'green'}}>
        <thead>
            <th>Carros</th>
        </thead>
        <tbody>
            {cars.map(car => (
            <tr key={car}>
            <td onClick={() => this.handleClick(car)}>{car}</td>
            </tr>
            ))}
        </tbody>
        </table>
        );
    }
}