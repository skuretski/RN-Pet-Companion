//Boilerplate code taken from: https://www.udemy.com/build-your-next-app-with-react-native-and-express/learn/v4/overview

import React from 'react';
import {connect} from 'react-redux';
import{
	StyleSheet,
	Text,
	View,
	StatusBar,
	Navigator,
	TouchableOpacity
} from 'react-native';

import AlertContainer from './alerts/AlertContainer';
import Login from './Login';
import TakePic from './TakePic';
import NewPet from './NewPet';
import ListViewPet from './ListViewPet';
import EditPet from './EditPet';

var App = React.createClass({
	getInitialState(){
		return {}
	},
	render() {
		var navigator = this.props.navigator;
		return(
			<Navigator
	        initialRoute={{
            id: 'Login', 
            name: 'Login',
            passProps:{
              pet_id: '',
              petName: '',
              petType: ''
            }
          }}
	        renderScene={this.renderScene}
	        configureScene={(route)=> {
	        if(route.sceneConfig) {
	          return route.sceneConfig;
	        }
	          return Navigator.SceneConfigs.FloatFromRight;
	        }} /> 
	    ); 
	},
	renderScene(route, navigator){
	    var route_id = route.id;
    if(route_id === 'Login' && !this.props.user_id){
      return (
        <Login navigator={navigator} />
      );
    }    
    if(route_id === 'NewPet' && this.props.user_id){
      return(
        <NewPet navigator={navigator} />
      )
    }
    if(route_id === 'TakePic' && this.props.user_id){
    	return(
    		<TakePic navigator={navigator} />
    	)
    }
    if(route_id === 'ListViewPet' && this.props.user_id){
      return(
        <ListViewPet navigator={navigator} {...route.passProps}/>
      );
    }
    if(route_id === 'ListViewPet' && !this.props.user_id){
    	return(
    		<Login navigator={navigator}/>
    	);
    }
    if(route_id === 'Login' && this.props.user_id){
    	return(
    		<ListViewPet navigator={navigator} {...route.passProps}/>
    	);
    }
    if(route_id === 'EditPet' && this.props.user_id){
      return (
        <EditPet navigator={navigator} {...route} {...route.passProps}/>
      );
    }
    return this.noRoute(navigator);
  },
  noRoute(navigator){
    return(
      <View style= {{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
      }}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          onPress={() => navigator.pop()}>
          <Text style={{fontWeight: 'bold', color:'red'}}> No route for this! Press to go back. </Text>
        </TouchableOpacity>
      </View>
    );
  }	
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 20,
		backgroundColor: '#ccc'
	},
});

var mapStateToProps = (state) => {
	return {
		user_id: state.auth.user_id
	}
}

module.exports = connect(mapStateToProps)(App);