import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
} from "react-native";
import PoppinsTextMedium from "../electrons/customFonts/PoppinsTextMedium";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import { months } from "moment/moment";
import PoppinsText from "../electrons/customFonts/PoppinsText";
import { ScrollView } from "react-native";
import * as Keychain from "react-native-keychain";
import { useGetMappingDetailsByAppUserIdMutation } from "../../apiServices/userMapping/userMappingApi";
import { BaseUrlImages } from "../../utils/BaseUrlImages";
import Close from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { gifUri } from '../../utils/GifUrl';
import FastImage from "react-native-fast-image";

// create a component
const UserInfoModal = ({membershipData ,isVisible, onClose }) => {
  const [mappingData, setMappingData] = useState();
  const [hide, setHide] = useState(true);
  const userData = useSelector((state) => state.appusersdata.userData);
 console.log("membershipdata",membershipData)
  const ternaryThemeColor = useSelector(
    (state) => state.apptheme.ternaryThemeColor
  )
    ? useSelector((state) => state.apptheme.ternaryThemeColor)
    : "#FFB533";

  const [
    listAddedUserFunc,
    {
      data: listAddedUserData,
      error: listAddedUserError,
      isLoading: listAddedUserIsLoading,
      isError: listAddedUserIsError,
    },
  ] = useGetMappingDetailsByAppUserIdMutation();

  useEffect(() => {
    const getData = async () => {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(
          "Credentials successfully loaded for user " + credentials.username
        );
        const token = credentials.username;
        const userId = userData.id;

        const params = {
          token: token,
          id: userId,
        };
        listAddedUserFunc(params);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (listAddedUserData) {
      console.log("listAddedUserData", JSON.stringify(listAddedUserData));
      setMappingData(listAddedUserData?.body);
    } else if (listAddedUserError) {
      console.log("listAddedUserError", listAddedUserError);
    }
  }, [listAddedUserData, listAddedUserError]);

  const touchedVideo = () => {
    Linking.openURL(`${getAppCampaignData?.body?.data?.[0]?.video_link}`);
    setHide(false);
  };

  const touchedKnowMore = () => {
    Linking.openURL(`${getAppCampaignData?.body?.data?.[0]?.web_link}`);
    setHide(false);
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <PoppinsTextMedium
            style={{ fontWeight: "800", color: "black", fontSize: 20 }}
            content="Welcome To Tropolite Rewards"
          ></PoppinsTextMedium>
          {/* {getAppCampaignData &&
                        <Image style={{ width: '100%', height: 150, resizeMode: "center", marginTop: 10 }} source={{ uri: BaseUrlImages + getAppCampaignData?.body?.data?.[0]?.image }}></Image>
                    } */}

         <View style={{width:'100%',alignItems:'flex-start',justifyContent:"center",marginTop:40}}>
          {listAddedUserIsLoading &&  <View style={{alignItems:'center',justifyContent:'center',width:'100%'}}>
          <FastImage
          style={{ width: 80, height: 80,marginBottom:0}}
          source={{
            uri: gifUri, // Update the path to your GIF
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
          </View>}
        
         <PoppinsTextMedium
            style={{ fontWeight: "800", color: "Grey", fontSize: 16, margin:4 }}
            content={`Name : ${userData.name}`}
          ></PoppinsTextMedium>
          <PoppinsTextMedium
            style={{ fontWeight: "800", color: "Grey", fontSize: 16, margin:4 }}
            content={`Mobile : ${userData.mobile}`}
          ></PoppinsTextMedium>
          {mappingData?.parent[0]?.app_user_name && <PoppinsTextMedium
            style={{ fontWeight: "800", color: "Grey", fontSize: 16, margin:4 }}
            content={`${mappingData?.parent[0]?.user_type} Name : ${mappingData?.parent[0]?.app_user_name}`}
          ></PoppinsTextMedium>}
          {mappingData?.parent[0]?.app_user_mobile && <PoppinsTextMedium
            style={{ fontWeight: "800", color: "Grey", fontSize: 16, margin:4 }}
            content={`${mappingData?.parent[0]?.user_type} Mobile : ${mappingData?.parent[0]?.app_user_mobile}`}
          ></PoppinsTextMedium>}
          <PoppinsTextMedium
            style={{ fontWeight: "800", color: "Grey", fontSize: 16, margin:4 }}
            content={`Membership Tier : ${membershipData?.tier?.name != undefined  ? membershipData?.tier?.name : ""}`}
          ></PoppinsTextMedium>
          {membershipData!=null && <PoppinsTextMedium
            style={{ fontWeight: "800", color: "Grey", fontSize: 16, margin:4 }}
            content={`Membership Range : ${membershipData?.range_start != undefined  ? membershipData?.range_start : ""} - ${membershipData?.range_end != undefined  ? membershipData?.range_end : ""}`}
          ></PoppinsTextMedium>}
           <PoppinsTextMedium
            style={{ fontWeight: "800", color: "Grey", fontSize: 16, margin:4 }}
            content={`Point Multiplier : ${membershipData?.points != undefined  ? membershipData?.points : ""} `}
          ></PoppinsTextMedium>
          {/* <PoppinsTextMedium
            style={{ fontWeight: "800", color: "Grey", fontSize: 16, margin:2 }}
            content={`${mappingData?.parent[0].user_type} Mobile : ${mappingData?.parent[0].app_user_mobile}`}
          ></PoppinsTextMedium> */}
         </View>

          

          <TouchableOpacity
            style={[
              {
                backgroundColor: ternaryThemeColor,
                padding: 6,
                borderRadius: 5,
                position: "absolute",
                top: -10,
                right: -10,
              },
            ]}
            onPress={() => {
              onClose();
            }}
          >
            <Close name="close" size={17} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: "90%",
    height: 350,
    borderRadius: 10,
    padding: 20,
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#0004ec",
    borderRadius: 10,
    position: "absolute",
    top: -10,
    right: -10,
  },

  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalTop: {
    height: 161,
    width: "100%",
  },
  circle: {
    backgroundColor: "#ffffff",
    height: 147,
    width: 147,
    borderRadius: 90,
  },
  listContainer: {
    marginTop: 20,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20,
  },
});

//make this component available to the app
export default UserInfoModal;
