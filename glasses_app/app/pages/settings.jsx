import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, SectionList, TouchableOpacity, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import SettingList from "../context/setting-data.jsx";

const Settings = () => {
  const { settings, changeSetting, resetSettings, setSettings } = useContext(SettingList);
	
	const [ tempSettings, setTempSettings ] = useState(settings);
  const [ tempEdit, setTempEdit ] = useState(false);
	const [ showDetail, setShowDetail ] = useState(null);

  useEffect(() => {
    /**var temp = false;
    Object.keys(tempSettings).forEach((key) => {
      //var disp = settingDisplay.find((element) => element.title == key);
      //alert(disp);
      temp = temp ||
            (tempSettings[key]!=settings[key]) /**||
            (settingDisplay.find((element) => element.setting ?? element.title == key).type == 'num-input' &&
              (tempSettings[key].toString() == "" ||
              ((settingDisplay.find((element) => element.setting ?? element.title == key).valid[0] && tempSettings[key] < settingDisplay.find((element) => element.setting ?? element.title == key).valid[1]) || (settingDisplay.find((element) => element.setting ?? element.title == key).valid[2] && tempSettings[key] > settingDisplay.find((element) => element.setting ?? element.title == key).valid[3]))));
      //alert(key+": "+(tempSettings[key].toString() == ""))**/
    /**});
    setTempEdit(temp);**/
    setTempEdit(true);
  }, [ tempSettings ]);

  const settingDisplay = [
		{title: 'Music Detection', data:
			[{setting: "refresh", title: 'refresh rate', type: 'num-input', valid: [false, 0, false, 0], detail: "How often the glasses will take a new clip to detect a change in the song (seconds)."},
       {setting: "scrollRate", title: 'scroll rate', type: 'num-input', valid: [true, 1, false, 0], detail: "The speed at which the onscreen lyrics will advance through the song. (minimum 1)"},
      ]},
		{title: 'Display', data:
			[{setting: 'textSize', title: 'font size', type: 'num-input', valid: [true, 1, true, 30], detail: 'Increases the size of the text displayed on the glasses. (number from 1 to 30)'},
       {setting: 'orientation', title: 'vertical', type: 'checkbox', detail: 'changes the output orientation onto the screen from horizontal to vertical.'},
			]},
		{title: 'Other', data:
			[{setting: "lowPow", title: 'low power mode', type: 'checkbox', detail: 'Reduces certain functionalities in order to save battery.'},
       {setting: "lowData", title: 'data saving mode', type: 'checkbox', detail: 'Does not download album covers for display.'},
  ]}];
    
  return (
		<SectionList
			bounces={false}
			backgroundColor="#262626"
			showsVerticalScrollIndicator={false}
			decelerationRate={0.97}
			indicatorStyle="white"
			stickySectionHeadersEnabled={false}
			sections={settingDisplay}
			data={settingDisplay}
			extraData={tempSettings}
			renderItem={({ item }) => {
				return (
					<View>
						<View style={styles.settingRow}>
							<View style={{flex: 1, flexDirection: "row", alignItems: 'center'}}><Text style={styles.settingText}>{item.title} </Text>
								{item.detail ? <TouchableOpacity onPress={() => {setShowDetail(showDetail == item.title ? null : item.title)}}><Feather style={styles.settingIcon} name='help-circle'/></TouchableOpacity> : <></>}
								{item.type == 'to-page' ? <TouchableOpacity><Feather style={styles.settingIcon} name='arrow-right'/></TouchableOpacity> : <></>}
								{item.type == 'checkbox' ? <TouchableOpacity activeOpacity={0.6} onPressOut={() => {setTempSettings({...tempSettings, [item.setting ?? item.title]: !tempSettings[item.setting ?? item.title]})}}><Feather style={styles.settingIcon} name={tempSettings[item.setting ?? item.title] == false ? "square" : "check-square"}/></TouchableOpacity> : <></>}
							</View>
							
							{item.type == 'num-input' ? <View style={{flex: 0.6, flexDirection: "row", gap: 15, alignItems: "center",}}><TextInput value={`${tempSettings[item.setting ?? item.title]}`} onChangeText={(text) => {setTempSettings({...tempSettings, [item.setting ?? item.title]: text})}} maxLength={6} keyboardAppearance={tempSettings.darkMode ? "dark" : "light"} inputMode='decimal' style={styles.numInput}></TextInput><Text style={{...styles.settingText, fontSize: 10}}>{tempSettings[item.setting ?? item.title].toString() == "" && ((item.valid[0] ? tempSettings[item.setting ?? item.title] < item.valid[1] : false) || (item.valid[2] ? tempSettings[item.setting ?? item.title] > item.valid[3] : false)) ? "Invalid input!" : ""}</Text></View> : <></>}
							
						</View>
						{showDetail == item.title ? <Text style={styles.text}>{item.detail}</Text> : <></>}
					</View>
				);
			}}
			renderSectionHeader={({section: {title}}) => (
				<View style={{height: 60}}>
					<View style={styles.sectionBox}>
						<Text style={styles.sectionTitle}>{title}</Text>
					</View>
				</View>
			)}
			renderSectionFooter={() => (<View style={{height: 15,}}/>)}
			ListHeaderComponent={
				<View style={{}}>
					<Text style={{...styles.headerText, marginBottom: 14,}}>SETTINGS</Text>
          <View style={{...styles.sectionBox, marginBottom: 5, marginTop: 0,}}>
					<TouchableOpacity disabled={!tempEdit} onPress={() => {setSettings(tempSettings); setTempEdit(false);}}><Feather name="save" style={tempEdit ? styles.icon : {...styles.icon, opacity: 0.4}}/></TouchableOpacity>
					<TouchableOpacity disabled={!tempEdit} onPress={() => {/**updateTempSettings();**/ setTempSettings(settings); setTempEdit(false);}}><Feather name="refresh-cw" style={tempEdit ? styles.icon : {...styles.icon, opacity: 0.4}}/></TouchableOpacity>
				</View>
				</View>
			}
			contentContainerStyle={{flexGrow: 1,}}
		/>
	);
}


const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 36,
    backgroundColor: "#262626"
  },
  
  headerText: {
    fontSize: 70,
    color: "#ACBFA4",
    marginVertical: 30,
    alignSelf: "center",
    fontFamily: "Didot",
    borderBottomWidth: 1,
    borderColor: "#ACBFA4",
  },

  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 35,
    paddingHorizontal: 25,
  },

  settingText: {
    fontSize: 16,
    color: "#ACBFA4",
    opacity: 0.8,
  },

  settingIcon: {
    fontSize: 16,
    color: '#ACBFA4',
    padding: 7,
    opacity: 0.8,
  },

  sectionBox: {
    height: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  },

  sectionTitle: {
    color: "#ACBFA4",
    fontFamily: "Didot",
    flex: 1,
    fontSize: 22,
    textTransform: "uppercase",
  },

  numInput: {
    backgroundColor: 'white',
    width: 60,
    height: 25,
    borderWidth: 1.5,
    borderColor: "#ACBFA4",
    padding: 3,
  },

  text: {
    fontSize: 15,
    fontFamily: "OpenSans",
    color: "black",
    backgroundColor: "#ACBFA4",
    opacity: 1,
    padding: 9,
    margin: 8,
    marginHorizontal: 16,
    opacity: 0.5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#ACBFA4",
  },

  icon: {
    fontSize: 23,
    color: "#ACBFA4",
    marginHorizontal: 30,
  },
});

export default Settings