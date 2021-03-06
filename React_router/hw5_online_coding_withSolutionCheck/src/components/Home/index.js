import React, {Component} from 'react';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {list: null}
  }

  componentDidMount() {
    if (this.props.isAuthed) {
      axios({method: 'get', url: 'http://api.haochuan.io/oj/problems?noError=1'})
      .then(res=>{
        this.setState({list: res.data.questions});
      })
      .catch(err=>{
        console.log(err);
        alert("GET request failed, server cannot get data. Please try again.");
      });
    } else {
      this.props.history.push('/login');
    }
  };

  selectQuestion = (id) => {
    this.props.history.push(`/${id}`);
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.list && this.state.list.map((q, idx) => {
            return (
              <li key={idx} role="button" onClick={()=>{this.selectQuestion(q.id)}}>
                {q.title}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Home;
