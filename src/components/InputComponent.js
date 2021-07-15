import React, { Component } from "react";
import { Entypo, Ionicons, Feather } from '@expo/vector-icons'
import { StyleSheet, View, TextInput, Button, ScrollView, TouchableOpacity } from "react-native";
import Text from './Text'
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";

class ViewExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    handleClick() {
        this.props.onClick(this.state.text);
    }
    render() {
        return (
            <KeyboardAccessoryView alwaysVisible={true} inSafeAreaView={false} bumperHeight={15} style={{ backgroundColor: "#fff" }}>
                {({ isKeyboardVisible }) => (
                    <View style={styles.textInputView}>
                        {/* <Text>Comment :</Text> */}
                        <TextInput
                            placeholder="Write your comment"
                            underlineColorAndroid="transparent"
                            style={styles.textInput}
                            multiline={false}
                            autoFocus={true}
                            onChangeText={(text) => {
                                this.setState({
                                    text: (text.trim())
                                });
                            }
                            }
                        />
                        {isKeyboardVisible && (
                            <TouchableOpacity onPress={() => this.handleClick()} >
                                <Feather style={styles.optionPostSend} name="send" size={21} color="#111" style={styles.iconComment} />
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </KeyboardAccessoryView>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    textInputView: {
        // flex: 1,
        padding: 4,
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 10,
    },
    textInput: {
        flexGrow: 1,
        marginLeft: 6,
        // flex: 1,
        // borderWidth: 1,
        // borderRadius: 20,
        // borderColor: "#CCC",
        padding: 7,
        // fontSize: 16,
        // marginRight: 10,
        maxWidth: '90%',
        textAlignVertical: "center",
        fontSize: 16,
        fontWeight: '400',
        borderColor: "#ccc",
        borderBottomWidth: 1,
    },
    textInputButton: {
        flexShrink: 1,
        fontSize: 16,
    },
    optionPostSend: {
        padding: 10,
    },
    iconComment: {
        padding: 8,
    }
});

export default ViewExample;
