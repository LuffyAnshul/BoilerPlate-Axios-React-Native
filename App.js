import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

export default function App() {

	const [imageURL, setImageURL ] = React.useState('');

	let openImagePickerAsync = async () => {
		let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
	
		if (permissionResult.granted === false) {
		  alert("Permission to access camera roll is required!");
		  return;
		}
	
		let pickerResult = await ImagePicker.launchImageLibraryAsync();
		console.log(pickerResult);

		const form = new FormData();

		form.append('key', '0c272406486c0a7910a310a6c8b34a30');
		form.append('image', {
			uri: pickerResult.uri,
			type: 'image/jpeg',
			name: 'Leo'
		});

		// alert(pickerResult.uri);

		axios({
			url: 'https://api.imgbb.com/1/upload',
			method: 'POST',
			data: form
		})
			.then((response) => {
				console.log(response);
				alert(JSON.stringify(response.data));
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const getAllPosts = () => {
		axios.get('https://jsonplaceholder.typicode.com/posts')
			.then(function (response) {
				console.log(JSON.stringify(response.data));
			})
			.catch(function (err) {
				console.error(err);
			});
	}

	const getSinglePost = () => {
		axios.get('https://jsonplaceholder.typicode.com/posts/1')
			.then(function (response) {
				console.log(JSON.stringify(response.data));
			})
			.catch(function (err) {
				console.error(err);
			});
	};

	const postDataUsingSimplePostCall = () => {
		axios.post('https://jsonplaceholder.typicode.com/posts', {
				title: 'foo',
				body: 'bar',
				userId: 1,
			})
			.then(function (response) {
				// handle success
				alert(JSON.stringify(response.data));
			})
			.catch(function (error) {
				// handle error
				alert(error.message);
			});
	};

	return (
		<View style={styles.container}>
			<Text>Axios Requests</Text>
			<TouchableOpacity 
				style={styles.buttonStyle}
				onPress={getAllPosts}
			>
				<Text>Get All Post</Text>
			</TouchableOpacity>
			<TouchableOpacity 
				style={styles.buttonStyle}
				onPress={getSinglePost}
			>
				<Text>Get First Post</Text>
			</TouchableOpacity>
			<TouchableOpacity 
				style={styles.buttonStyle}
				onPress={postDataUsingSimplePostCall}
			>
				<Text>Post Data</Text>
			</TouchableOpacity>
			<TouchableOpacity 
				style={styles.buttonStyle}
				onPress={openImagePickerAsync}
			>
				<Text>Upload Image</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonStyle: {
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		padding: 10,
		width: '100%',
		marginTop: 16,
	},
});
