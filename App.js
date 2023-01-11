// StAuth10244: I Kartik Patel, 000839320 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import { StyleSheet,Button, View, FlatList, TextInput,Text, Image, SectionList, ImageBackground } from 'react-native';
import React, {useState} from 'react';
import { inline } from 'react-native-web/dist/cjs/exports/StyleSheet/compiler';
const App = () => {
  const[collection,setCollection]=useState([[]]);
  const [domains,setDomains]=useState([]);
  const [query,setQuery]=useState("");
  const[count,setCount]=useState(0);
  const[status,setStatus]=useState(false);

 function forward()
 {
  try{
  if(count<collection.length-1){
    setDomains(collection[count+1]);
    setCount(count+1);
  }
 
  }
  catch(error)
  {
    console.error(error);
  }
 }
 function back()
 {
  try{
    if(count>0)
    {
      setDomains(collection[count-1]);
      setCount(count-1);
    }
    
  }
  catch(error)
  {
    console.error(error);
  }
 }
  async function getResults()
  {
    try
    {
    const request=await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+query);
    const jsonData=await request.json();
    let temp=[];

    for(let i=0;i<jsonData.meals.length;i++)
    {
      temp.push(jsonData.meals[i]);
    }
    setCount(0);
    setStatus(true);
   setCollection(temp);
   console.log(collection);
   setDomains(jsonData.meals[0]);
    }
    catch(error)
    {
      console.error(error);
      setStatus(false);
    }
  }
  return (
    <View style={{flex:1,padding:10,backgroundColor:'#b6c454'}}>
      <header style={styles.header}>
      <img src='https://i.pinimg.com/474x/ac/3f/01/ac3f019f294c79b556cd0706c8ac8b3f.jpg' style={{height:'150px',width:'150px',border:'2px solid black',borderRadius:'70%'}}/>
      <h1>Master Chef Book</h1>
      <h5>Find recipes on a single click.</h5>
      </header>
      <View style={styles.searchBox}>
      <TextInput placeholder='Search for food recipe by keyword' onChangeText={query=>setQuery(query)} style={{height:40,border:'3px solid black',marginBottom:5}}/>
      <Button onPress={getResults} title='Get the Recipe'/>
      </View>
      {status?
      <View>
      <View style={styles.recipeHeader}>
      <img src={domains.strMealThumb} alt='Food Image' style={{height:'300px',width:'500px',alignSelf:'left',flex:2}}/>
      <Text style={{fontSize:24,fontWeight:'bold',backgroundColor:'#fcaf58',border:'1px solid black',flex:4,textAlign:'center',paddingTop:'140px'}}>{domains.strMeal}</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',margin:'auto'}}>
     <View style={styles.orderButtons}>
     <Button  onPress={back} title='<'/>
     </View>
     <View style={{textAlign:'center',textAlignVertical:'center'}}>{count+1}/{collection.length}</View>
     <View style={styles.orderButtons}>
     <Button  onPress={forward} title='>'/>
     </View>
     </View>
      <View style={{flex:1,flexDirection:'row'}}>
      <SectionList sections={[
                {title:'Ingredients',data:[domains.strIngredient1,domains.strIngredient2,domains.strIngredient3,domains.strIngredient4,domains.strIngredient5,domains.strIngredient6,domains.strIngredient7,domains.strIngredient8,domains.strIngredient9,domains.strIngredient10,domains.strIngredient11]},
                {title:'Cooking Method',data:[domains.strInstructions]}
            ]} 
            renderItem={({item})=><div style={styles.row}><Text style={styles.item}>{item}</Text></div>}
            renderSectionHeader={({section})=><Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item,index)=>index}
            />
      </View></View> : <View style={styles.instruction}>
        <h1>Welcome to Master Chef Book</h1>
        <Text>New to Cooking? Not a problem, you are at the right place. Here on this platform, you can find plethora of recipes according to your interest.</Text>
        <Text>Getting recipes is as simple as texting to your friend.</Text>
        <Text>1. Just enter the keyword or full name of the recipe you want in the searchbox<br/>2. Hit the submit button<br/>That is it. You got your recipe.</Text>
        </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row:{
    border:'1px solid black'
  },
  sectionHeader:{
    paddingTop:2,
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:2,
    marginTop:5,
    marginBottom:5,
    fontSize:14,
    fontWeight:'bold',
    height:'30px',
    backgroundColor:'#614124',
    color:'white'
},
item:{
padding:10,
fontSize:18,
height:44
},
header:{
  width:'100%',
  height: '150px',
  display: 'flex',
 margin: 'auto',
 marginBottom: '10px',
 backgroundColor: '#8879B0',
 borderRadius:'10%',
 marginTop:'1%'
},
recipeHeader:{
  display:'flexBox',
  flexDirection:'row',
  backgroundColor:'#e6d3a3',
  border:'2px solid black',
  margin:'2px'
},
searchBox:{
  padding:10
},
orderButtons:{
  borderRadius:20,
  width:'100px',
  margin:'20px'
},
instruction:{
  border:'2px solid green',
  padding:'10px',
  margin:30
}
});

export default App;