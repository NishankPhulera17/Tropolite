import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList, Modal, Pressable, Text, ScrollView } from 'react-native';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import { useSelector } from 'react-redux';
import { useFetchGiftsRedemptionsOfUserMutation } from '../../apiServices/workflow/RedemptionApi';
import * as Keychain from 'react-native-keychain';
import { useFetchUserPointsMutation } from '../../apiServices/workflow/rewards/GetPointsApi';
import moment from 'moment';
import { BaseUrlImages } from '../../utils/BaseUrlImages';
import { useIsFocused } from '@react-navigation/native';
import ErrorModal from '../../components/modals/ErrorModal';
import MessageModal from '../../components/modals/MessageModal';
import FastImage from 'react-native-fast-image';
import FilterModal from '../../components/modals/FilterModal';
import { useCashPerPointMutation } from '../../apiServices/workflow/rewards/GetPointsApi';
import { useGetkycStatusMutation } from '../../apiServices/kyc/KycStatusApi';
import PoppinsTextLeftMedium from '../../components/electrons/customFonts/PoppinsTextLeftMedium';
import InputDate from '../../components/atoms/input/InputDate';
import { gifUri } from '../../utils/GifUrl';

const RedeemedHistory = ({ navigation }) => {
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false)
  const [redemptionStartData, setRedemptionStartDate]  = useState()
  const [redemptionEndDate, setRedemptionEndDate] = useState()
  const [showKyc, setShowKyc] = useState(true)
  const [redeemedListData, setRedeemedListData] = useState([])
  const [redemptionWindowEligibility, setRedemptionWindowEligibility] = useState(true)
  const [navigateTo, setNavigateTo] = useState()
  const ternaryThemeColor = useSelector(
    state => state.apptheme.ternaryThemeColor,
  )
    ? useSelector(state => state.apptheme.ternaryThemeColor)
    : 'grey';
  const userData = useSelector(state => state.appusersdata.userData)
  const userId = useSelector(state => state.appusersdata.userId);
  
  const appUserData = useSelector(state=>state.appusers.value)
  const id = useSelector(state => state.appusersdata.id);
  const focused = useIsFocused()
  const fetchPoints = async () => {
    const credentials = await Keychain.getGenericPassword();
    const token = credentials.username;
    const params = {
      userId: id,
      token: token
    }
    userPointFunc(params)

  }
  console.log("appUserData",appUserData)
  const noData = Image.resolveAssetSource(require('../../../assets/gif/noData.gif')).uri;
  let startDate,endDate
  const [
    FetchGiftsRedemptionsOfUser,
    {
      data: fetchGiftsRedemptionsOfUserData,
      isLoading: fetchGiftsRedemptionsOfUserIsLoading,
      isError: fetchGiftsRedemptionsOfUserIsError,
      error: fetchGiftsRedemptionsOfUserError,
    },
  ] = useFetchGiftsRedemptionsOfUserMutation();

  const [getKycStatusFunc, {
    data: getKycStatusData,
    error: getKycStatusError,
    isLoading: getKycStatusIsLoading,
    isError: getKycStatusIsError
  }] = useGetkycStatusMutation()

  const [userPointFunc, {
    data: userPointData,
    error: userPointError,
    isLoading: userPointIsLoading,
    isError: userPointIsError
  }] = useFetchUserPointsMutation()
  const [cashPerPointFunc,{
    data:cashPerPointData,
    error:cashPerPointError,
    isLoading:cashPerPointIsLoading,
    isError:cashPerPointIsError
  }] = useCashPerPointMutation()


  //check kyc status of user before redemption --------------------------
  // useEffect(() => {
  //   if (getKycStatusData) {
  //     console.log("getKycStatusData", getKycStatusData)
  //     if (getKycStatusData.success) {
  //       const tempStatus = Object.values(getKycStatusData.body)
        
  //       setShowKyc(tempStatus.includes(false))

       


  //     }
  //   }
  //   else if (getKycStatusError) {
  //     console.log("getKycStatusError", getKycStatusError)
  //   }
  // }, [getKycStatusData, getKycStatusError])
  //---------------------------------------------------------------------

  useEffect(() => {
    fetchPoints()
    if(appUserData!==undefined)
    {
     const influencerRedemptionCategories =  appUserData.filter((item)=>{
        return item.name===userData.user_type
      })
      console.log("influencerRedemptionCategories",influencerRedemptionCategories)
      if(influencerRedemptionCategories.length!==0)
      {
        setRedemptionStartDate(influencerRedemptionCategories[0].redeem_start_date)
        setRedemptionEndDate(influencerRedemptionCategories[0].redeem_end_date)
      }
      else{
        setRedemptionWindowEligibility(false)
      }
     
    }
  }, [focused])

  useEffect(()=>{
    if(cashPerPointData)
    {
        console.log("cashPerPointData",cashPerPointData)
        if(cashPerPointData.success)

        {
          const temp = cashPerPointData?.body
          setRedemptionStartDate(temp.redeem_start_date)
          setRedemptionEndDate(temp.redeem_end_date)
        }
    }
    else if(cashPerPointError){
        console.log("cashPerPointError",cashPerPointError)
        
    }
  },[cashPerPointData,cashPerPointError])

  useEffect(() => {
    if (userPointData) {
      console.log("userPointData", userPointData)
    }
    else if (userPointError) {
      console.log("userPointError", userPointError)
    }

  }, [userPointData, userPointError])

  

  useEffect(() => {
    (async () => {
      const credentials = await Keychain.getGenericPassword();
      const token = credentials.username;
      const userId = userData.id
      cashPerPointFunc(token)
      getKycStatusFunc(token)
      FetchGiftsRedemptionsOfUser({
        token: token,
        userId: userId,
        type: "1",

      });
    })();
  }, [focused]);

  useEffect(() => {
    if (fetchGiftsRedemptionsOfUserData) {
      console.log("fetchGiftsRedemptionsOfUserData", JSON.stringify(fetchGiftsRedemptionsOfUserData))
      fetchDates(fetchGiftsRedemptionsOfUserData.body.userPointsRedemptionList)
   
    }
    else if (fetchGiftsRedemptionsOfUserError) {
      console.log("fetchGiftsRedemptionsOfUserIsLoading", fetchGiftsRedemptionsOfUserError)
    }
  }, [fetchGiftsRedemptionsOfUserData, fetchGiftsRedemptionsOfUserError])

  

  const fetchDates = (data) => {
    const dateArr = []
    let tempArr = []
    let tempData = []
    data.map((item, index) => {
      dateArr.push(moment(item.created_at).format("DD-MMM-YYYY"))
    })
    const distinctDates = Array.from(new Set(dateArr))
    console.log("distinctDates", distinctDates)

    distinctDates.map((item1, index) => {
      tempData = []
      data.map((item2, index) => {
        if (moment(item2.created_at).format("DD-MMM-YYYY") === item1) {
          tempData.push(item2)
        }
      })
      tempArr.push({
        "date": item1,
        "data": tempData
      })
    })
    setRedeemedListData(tempArr)
    console.log("tempArr", JSON.stringify(tempArr))
  }
  const modalClose = () => {
    setError(false);
    setSuccess(false)
    
  };
  const fetchDataAccToFilter=()=>{
    
    console.log("fetchDataAccToFilter",startDate,endDate)
    if(startDate && endDate)
    {
      if(new Date(endDate).getTime() < new Date(startDate).getTime())
      {
        alert("Kindly enter proper end date")
        startDate=undefined
        endDate=undefined
      }
      else {
        console.log("fetchDataAccToFilter")
      }
      
    }
    else{
      alert("Kindly enter a valid date")
      startDate=undefined
      endDate=undefined
    }
  }

  const DisplayEarnings = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleRedeemButtonPress = () => {
      if (Number(userPointData.body.point_balance) <= 0 ) {
        setError(true)
        setMessage("You don't have enough points !")
      }
      else {
        
        if((Number(new Date(redemptionStartData).getTime()) < Number(new Date().getTime())) && ( Number(new Date().getTime())< Number(new Date(redemptionEndDate).getTime())) )
        {
          
          console.log("correct redemption date",new Date().getTime(),new Date(redemptionStartData).getTime(),new Date(redemptionEndDate).getTime())
          navigation.navigate('RedeemGifts')

        // check kyc condition---------------------------
        // if(!showKyc)
        // {
        //   setModalVisible(true)
        // }
        // else{
        //   setError(true)
        //   setMessage("Kyc not completed yet")
        //   setNavigateTo("Verification")
        // }
        //-------------------------------------------------
        }
        else{
          setError(true)
        setMessage("Redemption window starts from "+ moment(redemptionStartData).format("DD-MMM-YYYY") + " and ends on " +  moment(redemptionEndDate).format("DD-MMM-YYYY"))
        }
      }

    }
    return (
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {

            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image style={{ height: 80, width: 80, marginTop: 20 }} source={require('../../../assets/images/gift1.png')}></Image>
              <PoppinsTextMedium style={{ color: 'black', width: 300, marginTop: 20 }} content="Do you want redeem your point with amazing gift or cashback"></PoppinsTextMedium>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", marginTop: 20 }}>
                <TouchableOpacity onPress={() => {
                  console.log("gift")
                  setModalVisible(false)
                  navigation.navigate('RedeemGifts')

                }} style={{ alignItems: "center", justifyContent: "center", backgroundColor: '#0E2659', flexDirection: "row", height: 40, width: 100, borderRadius: 10 }}>
                  <Image style={{ height: 20, width: 20, resizeMode: "contain" }} source={require('../../../assets/images/giftWhite.png')}></Image>
                  <PoppinsTextMedium style={{ color: 'white', marginLeft: 10 }} content="Gift"></PoppinsTextMedium>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  console.log("cashback")
                  setModalVisible(false)
                  navigation.navigate('RedeemCashback')
                }} style={{ alignItems: "center", justifyContent: "center", backgroundColor: ternaryThemeColor, flexDirection: "row", marginLeft: 40, height: 40, width: 120, borderRadius: 10 }}>
                  <Image style={{ height: 20, width: 20, resizeMode: "contain" }} source={require('../../../assets/images/giftWhite.png')}></Image>
                  <PoppinsTextMedium style={{ color: 'white', marginLeft: 10 }} content="Cashback"></PoppinsTextMedium>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal> */}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {userPointData && <PoppinsText style={{ color: "black" }} content={userPointData.body.point_earned}></PoppinsText>}
          <PoppinsTextMedium style={{ color: "black", fontSize: 14 }} content="Lifetime Earnings"></PoppinsTextMedium>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
          {userPointData && <PoppinsText style={{ color: "black" }} content={userPointData.body.point_redeemed}></PoppinsText>}
          <PoppinsTextMedium style={{ color: "black", fontSize: 14 }} content="Lifetime Burns"></PoppinsTextMedium>
        </View>
        <TouchableOpacity onPress={() => {
          handleRedeemButtonPress()
        }} style={{ borderRadius: 2, height: 40, width: 100, backgroundColor: "#FFD11E", alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
          <PoppinsTextMedium style={{ color: 'black' }} content="Redeem"></PoppinsTextMedium>
        </TouchableOpacity>
      </View>
    )
  }

  const Header = () => {
    const [openBottomModal, setOpenBottomModal] = useState(false)
    const [message, setMessage] = useState()
    const modalClose = () => {
      setOpenBottomModal(false);
    };

    const onFilter = (data, type) => {
      console.log("submitted", data, type)

      if (type === "start") {
        startDate = data
      }
      if (type === "end") {
        endDate = data
      }
    }

    const ModalContent = (props) => {
      const [startDate, setStartDate] = useState("")
      const [openBottomModal, setOpenBottomModal] = useState(false)
      const [endDate, setEndDate] = useState("")





      const handleStartDate = (startdate) => {
        // console.log("start date", startdate)
        setStartDate(startdate?.value)
        props.handleFilter(startdate?.value, "start")
      }

      const handleEndDate = (enddate) => {
        // console.log("end date", enddate?.value)
        setEndDate(enddate?.value)
        props.handleFilter(enddate?.value, "end")
      }
      return (
        <View style={{ height: 320, backgroundColor: 'white', width: '100%', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>

          {openBottomModal && <FilterModal
            modalClose={modalClose}
            message={message}
            openModal={openBottomModal}
            handleFilter={onFilter}
            comp={ModalContent}></FilterModal>}

          <PoppinsTextLeftMedium content="Filter Scanned Data" style={{ color: 'black', marginTop: 20, marginLeft: '35%', fontWeight: 'bold' }}></PoppinsTextLeftMedium>
          <View>
            <InputDate data="Start Date" handleData={handleStartDate} />

          </View>
          <View>
            <InputDate data="End Date" handleData={handleEndDate} />
          </View>
          <TouchableOpacity onPress={() => { fetchDataAccToFilter() }} style={{ backgroundColor: ternaryThemeColor, marginHorizontal: 50, height: 40, alignItems: 'center', justifyContent: 'center', marginTop: 10, borderRadius: 10 }}>
            <PoppinsTextMedium content="SUBMIT" style={{ color: 'white', fontSize: 20, borderRadius: 10, }}></PoppinsTextMedium>
          </TouchableOpacity>

        </View>
      )
    }

    return (
      <View style={{ height: 40, width: '100%', backgroundColor: '#DDDDDD', alignItems: "center", flexDirection: "row", marginTop: 20 }}>

        <PoppinsTextMedium style={{ marginLeft: 20, fontSize: 16, position: "absolute", left: 10 }} content="Redeemed Ladger"></PoppinsTextMedium>

        <TouchableOpacity onPress={() => { setOpenBottomModal(!openBottomModal), setMessage("BOTTOM MODAL") }} style={{ position: "absolute", right: 20 }}>
          <Image style={{ height: 22, width: 22, resizeMode: "contain" }} source={require('../../../assets/images/settings.png')}></Image>
        </TouchableOpacity>

        {openBottomModal && <FilterModal
          modalClose={modalClose}
          message={message}
          openModal={openBottomModal}
          handleFilter={onFilter}
          comp={ModalContent}></FilterModal>}

      </View>
    )
  }


  const ListItem = (props) => {
    const data = props.data
    const description = data.gift.gift[0].name
    const productCode = props.productCode
    const time = props.time
    const productStatus = props.productStatus
    const amount = props.amount
    const image = data.gift.gift[0].images[0]
    console.log("data from listItem", data.gift.gift[0])
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate('RedeemedDetails', { data: data })
      }} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10, width: "100%", marginBottom: 10 }}>
        <View style={{ height: 70, width: 70, alignItems: "center", justifyContent: "center", borderRadius: 10, borderWidth: 1, borderColor: '#DDDDDD', right: 10 }}>
          <Image style={{ height: 50, width: 50, resizeMode: "contain" }} source={{ uri: BaseUrlImages + image }}></Image>
        </View>
        <View style={{ alignItems: "flex-start", justifyContent: "center", marginLeft: 0, width: 160 }}>
          <PoppinsTextMedium style={{ fontWeight: '600', fontSize: 16, color: 'black', textAlign: 'auto' }} content={description}></PoppinsTextMedium>
          <View style={{ backgroundColor: ternaryThemeColor, alignItems: 'center', justifyContent: "center", borderRadius: 4, padding: 3, paddingLeft: 5, paddingRight: 5 }}>
            <PoppinsTextMedium style={{ fontWeight: '400', fontSize: 12, color: 'white' }} content={`Product Status : ${productStatus}`}></PoppinsTextMedium>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 4 }}>
            <Image style={{ height: 14, width: 14, resizeMode: "contain" }} source={require('../../../assets/images/clock.png')}></Image>
            <PoppinsTextMedium style={{ fontWeight: '200', fontSize: 12, color: 'grey', marginLeft: 4 }} content={time}></PoppinsTextMedium>

          </View>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 40 }}>

          <PoppinsTextMedium style={{ color: ternaryThemeColor, fontSize: 18, fontWeight: "700" }} content={` - ${amount}`}></PoppinsTextMedium>
          <PoppinsTextMedium style={{ color: "grey", fontSize: 14 }} content="PTS"></PoppinsTextMedium>

        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={{ alignItems: "center", justifyContent: "flex-start", width: '100%', height: '100%', backgroundColor: "white" }}>
      {error  && (
        <ErrorModal
          modalClose={modalClose}
          message={message}
          openModal={error}
          navigateTo={navigateTo}
          ></ErrorModal>
      )}
      {error && navigateTo && (
        <ErrorModal
          modalClose={modalClose}
          message={message}
          openModal={error}
          navigateTo={navigateTo}
          ></ErrorModal>
      )}
      {success && (
        <MessageModal
          modalClose={modalClose}
          message={message}
          openModal={success}></MessageModal>
      )}

      <View style={{ alignItems: "center", justifyContent: "flex-start", flexDirection: "row", width: '100%', marginTop: 10, height: 40, marginLeft: 20 }}>
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}>
          <Image style={{ height: 24, width: 24, resizeMode: 'contain', marginLeft: 10 }} source={require('../../../assets/images/blackBack.png')}></Image>

        </TouchableOpacity>
        <PoppinsTextMedium content="Redeemed History" style={{ marginLeft: 10, fontSize: 16, fontWeight: '600', color: '#171717' }}></PoppinsTextMedium>
        <TouchableOpacity style={{ marginLeft: 160 }}>
          {/* <Image style={{height:30,width:30,resizeMode:'contain'}} source={require('../../../assets/images/notificationOn.png')}></Image> */}
        </TouchableOpacity>
      </View>
      <View style={{ padding: 14, alignItems: "flex-start", justifyContent: "flex-start", width: "100%" }}>
        <PoppinsTextMedium style={{ marginLeft: 10, fontSize: 20, fontWeight: '600', color: '#6E6E6E' }} content="You Have"></PoppinsTextMedium>
        <Image style={{ position: 'absolute', right: 0, width: 117, height: 82, marginRight: 23, marginTop: 20 }} source={require('../../../assets/images/reedem2.png')}></Image>

        {userPointData &&
          <PoppinsText style={{ marginLeft: 10, fontSize: 34, fontWeight: '600', color: '#373737' }} content={userPointData.body.point_balance}></PoppinsText>

        }
        <PoppinsTextMedium style={{ marginLeft: 10, fontSize: 20, fontWeight: '600', color: '#6E6E6E' }} content="Points Balance"></PoppinsTextMedium>
      </View>
      <DisplayEarnings></DisplayEarnings>
      <Header></Header>
     
        
          <FlatList
                  
          data={redeemedListData}
          maxToRenderPerBatch={10}
          initialNumToRender={10}
          renderItem={({ item,index }) => (
            
              <View key={index} style={{ alignItems: "center", justifyContent: "center", width: '100%' }} >

                <View style={{ alignItems: "flex-start", justifyContent: "center", paddingBottom: 10, marginTop: 20, marginLeft: 20, width: '100%' }}>
                  <PoppinsTextMedium style={{ color: 'black', fontSize: 16 }} content={(item.date)}></PoppinsTextMedium>

                </View>

                {
                  item.data.map((item, index) => {
                    return (
                      <View key={index}>
                        <ListItem data={item} productStatus={item.gift_status} description={item.gift} productCode={item.product_code} amount={item.points} time={moment(item.created_at).format('HH:MM')} />

                      </View>


                    )
                  })
                }
              </View>
            
          )}
          keyExtractor={(item, index) => index}
        />
          {/* // redeemedListData && redeemedListData.map((item, index) => {
          //   return (
          //     <View key={index} style={{ alignItems: "center", justifyContent: "center", width: '100%' }} >

          //       <View style={{ alignItems: "flex-start", justifyContent: "center", paddingBottom: 10, marginTop: 20, marginLeft: 20, width: '100%' }}>
          //         <PoppinsTextMedium style={{ color: 'black', fontSize: 16 }} content={(item.date)}></PoppinsTextMedium>

          //       </View>

          //       {
          //         item.data.map((item, index) => {
          //           return (
          //             <View key={index}>
          //               <ListItem data={item} description={item.gift} productCode={item.product_code} amount={item.points} time={moment(item.created_at).format('HH:MM')} />

          //             </View>


          //           )
          //         })
          //       }
          //     </View>
          //   )

          // }) */}
     

      {
        fetchGiftsRedemptionsOfUserIsLoading &&
        <FastImage
          style={{ width: 100, height: 100, alignSelf: 'center', marginTop: '50%' }}
          source={{
            uri: gifUri, // Update the path to your GIF
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      }
  {/* {console.log("fetchGiftsRedemptionsOfUserData body", redeemedListData)} */}
      {
        redeemedListData.length == 0 &&
        <View>

        <FastImage
          style={{ width: 180, height: 180,marginBottom:-10}}
          source={{
            uri: noData, // Update the path to your GIF
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
          <PoppinsTextMedium style={{ color: '#808080',  fontWeight: 'bold' ,marginBottom:200  }} content="NO DATA"></PoppinsTextMedium>
    </View>


      }

    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 240,
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default RedeemedHistory;