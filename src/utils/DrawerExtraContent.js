<View >
{/* My Program Starting */}
<View
  style={{
    minHeight: 54,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    paddingBottom:10,
    // zIndex:1,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor:"white"
  }}>
  <TouchableOpacity
    onPress={() => {
      setMyProgramVisibile(!myProgramVisible)
    }}
    style={{
      width: '20%',
      alignItems: 'center',
      // justifyContent: 'center',
      height: '100%',
      marginTop:10
    }}>

    {/* <SvgUri width={40} height={40} uri={image}></SvgUri> */}
    {/* <Icon size={size} name="bars" color={ternaryThemeColor}></Icon> */}
    {!myProgramVisible && <Image style={{ height: 20, width: 20, resizeMode: 'contain',transform: [{ rotate: '270deg' }],marginTop:4 }} source={require('../../assets/images/arrowDown.png')}></Image>}
    {myProgramVisible && <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../assets/images/arrowDown.png')}></Image>}
  </TouchableOpacity>


  <View
    style={{
      width: '80%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>
    <TouchableOpacity
      onPress={() => {
        setMyProgramVisibile(!myProgramVisible)
      }}>
      <Text style={{ color: primaryThemeColor, fontSize: 15 }}>My Program</Text>
    </TouchableOpacity>

    {myProgramVisible &&
    <View style={{marginTop:5}}>
      <TouchableOpacity style={{ marginTop:5,marginBottom:5 }} onPress={()=>{navigation.navigate("Tutorial")}}>
        <Text onPress={()=>{
            navigation.navigate("Tutorial")
        }} style={{  fontSize:15, color:ternaryThemeColor }}>Tutorial</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop:5,marginBottom:5 }} onPress={()=>[
       getPolicyData && navigation.navigate("PdfComponent",{pdf: getPolicyData?.body?.data?.[0]?.files?.[0]})
      ]}>
        <Text  style={{  fontSize:15, color:ternaryThemeColor }}>Policies</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop:5,marginBottom:5 }} onPress={()=>{
        getTermsData && navigation.navigate('PdfComponent',{pdf:getTermsData.body.data?.[0]?.files[0]})
      }}>
        <Text  style={{  fontSize:15, color:ternaryThemeColor }}>T&C</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop:5,marginBottom:5 }} onPress={()=>{
        navigation.navigate('FAQ');
      }}>
        <Text  style={{  fontSize:15, color:ternaryThemeColor }}>F&Q</Text>
      </TouchableOpacity>
      
      </View>
      
    }

  </View>
</View>
{/* My Program ending*/}

  {/* Ozone Products Starting */}
  <View
  style={{
    minHeight: 54,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    paddingBottom:10,
    // zIndex:1,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor:"white"
  }}>
  <TouchableOpacity
    onPress={() => {
      setOzoneProductVisible(!ozoneProductVisible)
    }}
    style={{
      width: '20%',
      alignItems: 'center',
      // justifyContent: 'center',
      height: '100%',
      marginTop:10
    }}>

    {/* <SvgUri width={40} height={40} uri={image}></SvgUri> */}
    {/* <Icon size={size} name="bars" color={ternaryThemeColor}></Icon> */}
    {!ozoneProductVisible && <Image style={{ height: 20, width: 20, resizeMode: 'contain',transform: [{ rotate: '270deg' }],marginTop:4 }} source={require('../../assets/images/arrowDown.png')}></Image>}
    {ozoneProductVisible && <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../assets/images/arrowDown.png')}></Image>}
  </TouchableOpacity>


  <View
    style={{
      width: '80%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>
    <TouchableOpacity
      onPress={() => {
        setOzoneProductVisible(!ozoneProductVisible)
      }}>
      <Text style={{ color: primaryThemeColor, fontSize: 15 }}>Ozone Products</Text>
    </TouchableOpacity>

    {ozoneProductVisible &&
    <View style={{marginTop:5}}>
      <TouchableOpacity style={{ marginTop:5,marginBottom:5 }} onPress={()=>{
        navigation.navigate('ProductCatalogue')

      }}>
        <Text style={{  fontSize:15, color:ternaryThemeColor }}>Product Catalogue</Text> 
      </TouchableOpacity>    

      <TouchableOpacity style={{ marginTop:5,marginBottom:5 }} onPress={()=>{Linking.openURL("https://www.ozone-india.com/")}}>
        <Text style={{  fontSize:15, color:ternaryThemeColor }}>Jump to ozone website</Text> 
      </TouchableOpacity>   

      <TouchableOpacity style={{ marginTop:5,marginBottom:5 }} onPress={()=>{navigation.navigate("ProductCategory")}}>
        <Text style={{  fontSize:15, color:ternaryThemeColor }}>Category wise product info</Text> 
      </TouchableOpacity>   
      </View>
      
    }

  </View>
</View>
{/* Ozone Products ending*/}

   {/* Community Starting */}
   <View
  style={{
    minHeight: 54,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    paddingBottom:10,
    // zIndex:1,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor:"white"
  }}>
  <TouchableOpacity
    onPress={() => {
      setCommunityVisible(!communityVisible)
    }}
    style={{
      width: '20%',
      alignItems: 'center',
      // justifyContent: 'center',
      height: '100%',
      marginTop:10
    }}>

    {/* <SvgUri width={40} height={40} uri={image}></SvgUri> */}
    {/* <Icon size={size} name="bars" color={ternaryThemeColor}></Icon> */}
    {!communityVisible && <Image style={{ height: 20, width: 20, resizeMode: 'contain',transform: [{ rotate: '270deg' }],marginTop:4 }} source={require('../../assets/images/arrowDown.png')}></Image>}
    {communityVisible && <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../assets/images/arrowDown.png')}></Image>}
  </TouchableOpacity>


  <View
    style={{
      width: '80%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>
    <TouchableOpacity
      onPress={() => {
        setCommunityVisible(!communityVisible)
      }}>
      <Text style={{ color: primaryThemeColor, fontSize: 15 }}>Community</Text>
    </TouchableOpacity>

    {communityVisible &&
    <View style={{marginTop:5}}>
      <TouchableOpacity style={{ marginTop:5,marginBottom:5 }} onPress={()=>{
        navigation.navigate("WhatsNew")
      }}>
        <Text style={{  fontSize:15, color:ternaryThemeColor }}>What's New</Text> 
      </TouchableOpacity>    

      <TouchableOpacity style={{ marginTop:5,marginBottom:5 }} onPress={()=>{
        console.log(BaseUrlImages+"images-1700639007902-188225481.pdf")
        navigation.navigate("PdfComponent",{pdf:"images-1700639007902-188225481.pdf"})
        
      //  getPolicyData && navigation.navigate("PdfComponent",{pdf: getPolicyData?.body?.data?.[0]?.files?.[0]})

      }}>
        <Text style={{  fontSize:15, color:ternaryThemeColor }}>Program Content</Text> 
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop:5,marginBottom:5 }} onPress={()=>{navigation.navigate("TierDetails")}}>
        <Text style={{  fontSize:15, color:ternaryThemeColor }}>Tier Details</Text> 
      </TouchableOpacity>    
      </View> 
    }

  </View>
</View>
{/* Community ending*/}

  {/* Knowledge Hub */}
  <View
  style={{
    minHeight: 54,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    paddingBottom:10,
    // zIndex:1,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor:'white'
  }}>
  <TouchableOpacity
    onPress={() => {
      setKnowledgeHubVisible(!KnowledgeHubVisible)
    }}
    style={{
      width: '20%',
      alignItems: 'center',
      // justifyContent: 'center',
      height: '100%',
      marginTop:10
    }}>

    {/* <SvgUri width={40} height={40} uri={image}></SvgUri> */}
    {/* <Icon size={size} name="bars" color={ternaryThemeColor}></Icon> */}
    {!KnowledgeHubVisible && <Image style={{ height: 20, width: 20, resizeMode: 'contain',transform: [{ rotate: '270deg' }],marginTop:4 }} source={require('../../assets/images/arrowDown.png')}></Image>}
    {KnowledgeHubVisible && <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../assets/images/arrowDown.png')}></Image>}
  </TouchableOpacity>


  <View
    style={{
      width: '80%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>
    <TouchableOpacity
      onPress={() => {
        setKnowledgeHubVisible(!KnowledgeHubVisible)
      }}>
      <Text style={{ color: primaryThemeColor, fontSize: 15 }}>Knowledge Hub</Text>
    </TouchableOpacity>

    {KnowledgeHubVisible &&
    <View style={{marginTop:5}}>
      <TouchableOpacity onPress={()=>{
        navigation.navigate("InstallationVideo")
      }} style={{ marginTop:5,marginBottom:5 }}>
        <Text style={{  fontSize:15, color:ternaryThemeColor }}>Installation Video</Text> 
      </TouchableOpacity>    
{/* 
      <TouchableOpacity style={{ marginTop:5,marginBottom:5 }} onPress={()=>{
        navigation.navigate("ProductCatalogue")
      }}>
        <Text style={{  fontSize:15, color:ternaryThemeColor }}>Product Guideline</Text> 
      </TouchableOpacity>     */}

        {/* <TouchableOpacity style={{ marginTop:5,marginBottom:5 }} onPress={()=>{navigation.navigate("ListAddress")}}>
        <Text style={{  fontSize:15, color:ternaryThemeColor }}>List Address</Text> 
      </TouchableOpacity>     */}
      </View> 
    }

  </View>
</View>
{/* Knowledge Hub*/}
</View>