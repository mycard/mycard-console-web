import React from "react";
import {connect} from "dva";
import Nav from "../components/Common/Nav";


import {Layout} from "antd";

class Entry extends React.Component {

  componentWillMount() {
    const {dispatch, location: {pathname}} = this.props
    if (pathname !== 'loginCallback') {
      dispatch({type: 'Common/init'})
    }
  }

  render() {
    const {children} = this.props
    return (
      <Layout style={{flexDirection: 'row', minHeight: '100%'}}>
        <Nav />
        <Layout style={{minHeight: '400px'}}>
          {children}
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Entry);
