import styled from 'styled-components';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #fff;
  padding: 20px;
`;

export const Card = styled.View`
  background-color: #f8f8f8;
  width: 400px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding: 15px;
`;

export const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const UserInfoText = styled.View`
  flex-direction: column;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  font-family: 'Lato-Regular';
`;

export const PostTime = styled.Text`
  font-size: 12px;
  font-family: 'Lato-Regular';
  color: #666;
`;

export const PostText = styled.Text`
  font-size: 14px;
  font-family: 'Lato-Regular';
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 15px;
`;

export const PostImg = styled.Image`
  width: 100%;
  height: 250px;
  /* margin-top: 15px; */
`;

export const Divider = styled.ScrollView`
flex: 1;
`;

export const InteractionWrapper = styled.SafeAreaView`
flex: 1;
`;

export const Interaction = styled.TouchableOpacity`
  flex-direction: row;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? '#2e64e515' : 'transparent')};
`;

export const InteractionText = styled.Text`
  font-size: 14px;
  color: ${(props) => (props.active ? '#2e64e5' : '#333')};
  margin-top: 5px;
  margin-left: 0px;
`;
export const InteractionTextInput = styled.TextInput`
  font-size: 16px;
  font-weight: 400;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
  color: ${(props) => (props.active ? '#2e64e5' : '#333')};
  margin-top: 5px;
  margin-left: 5px;
`;

export const InteractionKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex-direction: row;
  justify-content: space-around;
  padding: 15px;
`;