import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Navigator,
  PixelRatio,
  Image,
  BackAndroid,
  Platform
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
var TakePic = React.createClass({
	getInitialState: function(){
		return{
			avatarSource: null
		}
	},
	selectPhotoTapped(){
		const options ={
			quality: 1.0,
			maxWidth: 200,
			maxHeight: 200,
			storageOptions: {
				skipBackup: true
			}
		};
		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response =', response);
			if(response.didCancel)
				console.log('User cancelled photo picker.');
			else if(response.error)
				console.log('ImagePicker error: ', response.error);
			else{
				var source;
				if(Platform.OS === 'android')
					source={uri: response.uri, isStatic: true};
				else
					source={uri:response.uri.replace('file://',''), isStatic: true};
				this.setState({
					avatarSource: source
				});
			}
		});
	},
	goBack(){
			this.props.navigator.pop();
	},
	render(){
		return(
			<Navigator
				renderScene={this.renderScene}
			/>
		);
	},
	renderScene(route, navigator){
		return(		
	      <View style={styles.container}>			
	      	<View style={styles.topBar}>
	      		<View>
				<TouchableOpacity onPress={this.goBack}>
					<Text style={styles.title}>  Back  </Text>
				</TouchableOpacity>
				</View>
				<Text style={styles.title}>
					Picture!
				</Text>
			</View>
	        <TouchableOpacity onPress={this.selectPhotoTapped}>
	          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
	          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
	            <Image style={styles.avatar} source={this.state.avatarSource} />
	          }
	          </View>
	        </TouchableOpacity>
	      </View>
    	);
	}
});

var styles = StyleSheet.create({
  	title: {
    	fontWeight: '500',
  	},
  	container: {
	    flex: 1,
	    justifyContent: 'flex-start',
	    alignItems: 'center',
	    backgroundColor: '#F5FCFF'
  	},
    avatarContainer: {
        borderColor: '#9B9B9B',
    	borderWidth: 1 / PixelRatio.get(),
    	justifyContent: 'center',
    	alignItems: 'center',
  	},
	avatar: {
	    borderRadius: 75,
	    width: 150,
	    height: 150
	},
  	topBar: {
		padding: 10,
		paddingTop: 10,
		paddingLeft: 120,
		paddingRight: 120,
		paddingBottom: 10,
		alignItems: 'stretch',
		backgroundColor: '#4fc3f7',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	title: {
		color: 'white',
		fontSize: 20
	},
});

module.exports = TakePic;