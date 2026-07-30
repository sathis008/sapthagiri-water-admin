import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, Text } from 'react-native-paper';
export default function SplashScreen(){return <View style={styles.page}><View style={styles.logo}><MaterialCommunityIcons name="water" size={42} color="#0B6E4F"/></View><Text variant="headlineSmall" style={styles.title}>Sapthagiri Water</Text><Text style={styles.caption}>Delivery management, simplified</Text><ActivityIndicator color="#BDE4D2" style={styles.loader}/></View>}
const styles=StyleSheet.create({page:{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#0B6E4F'},logo:{width:86,height:86,borderRadius:28,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',marginBottom:20},title:{color:'#fff',fontWeight:'800'},caption:{color:'#D7F0E3',marginTop:6},loader:{marginTop:40}});
