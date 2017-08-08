import React from 'react'
import {Button, Modal, Text, TextInput, View} from 'react-native'
import styles from '../css/app.css'
import PropTypes from 'prop-types'

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<Modal animationType='slide' isOpen={true} visible={true} onRequestClose={() => {}} contentLabel='Salut'>
            <View>
                <Text>Vous n'êtes pas encore connecté à l'api SNCF</Text>
                <Text> </Text>
                <Text>C'est gratuit !</Text>
                <Text>Rendez vous sur http://data.sncf.com/api</Text>
                <Text>Puis revenez ici avec votre token</Text>
                <Text>Remplissez la valeur ci-dessous</Text>
                <Text> </Text>
                <View><Text>Token :</Text><TextInput onChangeText={(text) => this.setState({savedToken: text})}
                                                     id='apiToken' label='token sncf' style={styles.signIn}/></View>
                <Text> </Text>
                <Text>{this.props.loginError}</Text>
            </View>
            <Button title='ok' onPress={() => this.props.validateToken(this.state.savedToken)} />
        </Modal>)
    }
}

SignUp.propTypes = {
    loginError: PropTypes.string,
    validateToken: PropTypes.func.isRequired,
}