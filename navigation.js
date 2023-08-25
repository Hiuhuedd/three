import React, {  useContext,} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, NavigationContext, } from "@react-navigation/native";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import IntroScreen from "./screens/IntroScreen";
import AuthScreen from "./screens/AuthScreen";
import PinScreen from "./screens/PinScreen";
import THook from "./screens/THook";
import Timetable from "./screens/Timetable";
import UnitDetails from "./screens/UnitDetails";
import Home from "./screens/Home";
import Program from "./screens/Program";
import Trail from "./screens/Chat";
import Me from "./screens/Me";
import Chat from "./screens/Chat";
import Themes from "./screens/Themes";
import Events from "./screens/Events";
import Navigate from "./screens/Navigate";
import ReferralScreen from "./screens/ReferralScreen";
import InvitesOnboarding from "./screens/InvitesOnboarding";
import Tokens from "./screens/Tokens";
import Premium from "./screens/Premium";
import AiModels from "./screens/AiModels";
import PolicyAgreement from "./screens/PolicyAgreement";
import Walkthrough from "./screens/Walkthrough";
import SignIn from "./screens/SignIn";
import Discord from "./screens/Discord";


//Screens

const store = configureStore();
export default function RootNavigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };
  const navigation = useContext(NavigationContext) 
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="IntroScreen" screenOptions={screenOptions}>
          <Stack.Screen name="IntroScreen" component={IntroScreen} /> 
          <Stack.Screen name="AuthScreen" component={AuthScreen} /> 
          <Stack.Screen name="PinScreen" component={PinScreen} /> 
          <Stack.Screen name="THook" component={THook} /> 
          <Stack.Screen name="Timetable" component={Timetable} /> 
          <Stack.Screen name="UnitDetails" component={UnitDetails} /> 
          <Stack.Screen name="Home" component={Home} /> 
          <Stack.Screen name="Program" component={Program} /> 
          <Stack.Screen name="Me" component={Me} /> 
          <Stack.Screen name="Chat" component={Chat} /> 
          <Stack.Screen name="Events" component={Events} /> 
          <Stack.Screen name="Themes" component={Themes} /> 
          <Stack.Screen name="Navigate" component={Navigate} /> 
          <Stack.Screen name="ReferralScreen" component={ReferralScreen} /> 
          <Stack.Screen name="InvitesOnboarding" component={InvitesOnboarding} /> 
          <Stack.Screen name="Tokens" component={Tokens} /> 
          <Stack.Screen name="Premium" component={Premium} /> 
          <Stack.Screen name="AiModels" component={AiModels} /> 
          <Stack.Screen name="PolicyAgreement" component={PolicyAgreement} /> 
          <Stack.Screen name="Walkthrough" component={Walkthrough} /> 
          <Stack.Screen name="SignIn" component={SignIn} /> 
          <Stack.Screen name="Discord" component={Discord} /> 
          
        </Stack.Navigator>
      
      </NavigationContainer>
    </ReduxProvider>
  );
}
