import { Component } from 'react'
import Child from './child'
class LifecycleDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    doInCrement() {
       this.setState({
        count: this.state.count + 1
       })
    }
    componentDidMount() {
        console.log('组件挂载了')
    }
    componentDidUpdate() {
        console.log('组件更新了')
    }
    componentWillUnmount() {
        console.log('组件卸载了')
    }

    // 状态，生命周期
    // JSX
    render() {
        return (
            <>
            <h1>LifecycleDemo</h1>
            <p>
                count: {this.state.count}
            </p>
            <button onClick={this.doInCrement.bind(this)}>
                Increment
            </button>
            <Child title = "hello" />
            </>
        )
    }

}

export default LifecycleDemo