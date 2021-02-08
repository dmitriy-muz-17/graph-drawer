import './style.css';
import React from 'react';
import Graph from '../../Entity/Graph'
import Vertice from '../../Entity/Vertice'
import { Stage, Layer, Label, Rect, Text, Circle, Line } from 'react-konva';

class Playground extends React.Component {
  state = {graph: new Graph(), matrix: Array(100).fill(Array(100).fill(null)), chosen: null};

  constructor(props){
    super(props);
  }

  verticeChosen = (e) => {
    e.cancelBubble = true;

    let key = e.target.attrs.id;
    if(this.state.chosen !== null && this.state.chosen != key){
      console.log(this.state.chosen, key);
      this.state.graph.linkVertices(this.state.chosen, key)
      this.state.chosen = null
      this.forceUpdate()

      return
    }

    this.state.chosen = key;
  }

  drawVertice = (e) => {
    let pos = e.target.getStage().getPointerPosition()

    if(this.state.graph.canDrawVertice(pos)){
      let newVertice = new Vertice(this.state.graph.vertices.length+1, pos)
      this.state.graph.addVertice(newVertice)
      this.forceUpdate()
    }

    this.state.chosen = null
  }

  render(){
    return (
      <Stage width={window.innerWidth} height={window.innerHeight} onClick={this.drawVertice} value='2'>
        <Layer>
          {this.state.graph.vertices.map((vertice) => (
            <Label>
          {this.state.graph.vertices.map((vertice) => {
            let lines = []

            for(let adjasent of vertice.adjasents){
              lines.push(<Line
                points={[vertice.coordinates.x, vertice.coordinates.y, adjasent.coordinates.x, adjasent.coordinates.y]}
                stroke='5px'
                />)
            }

            return(lines)
          })}
              <Circle
                key={vertice.key}
                id={vertice.key}
                x={vertice.coordinates.x}
                y={vertice.coordinates.y}
                width={40}
                height={40}
                fill="#89b717"
                onClick={this.verticeChosen}
              />
              <Text
                text={vertice.key}
                x={vertice.coordinates.x-3}
                y={vertice.coordinates.y-5}
              />
            </Label>
          ))}
        </Layer>
      </Stage>
    )
  }
}

export default Playground;
