import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { setRestored, setSession } from '../store';
import { sessionStorage } from '../services/storage';
import { sessionEvents } from '../services/sessionEvents';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import CustomersScreen from '../screens/CustomersScreen';
import CustomerFormScreen from '../screens/CustomerFormScreen';
import CustomerDetailsScreen from '../screens/CustomerDetailsScreen';
import BookingsScreen from '../screens/BookingsScreen';
import BookingFormScreen from '../screens/BookingFormScreen';
import BookingDetailsScreen from '../screens/BookingDetailsScreen';
const Stack = createNativeStackNavigator(); const Tab = createBottomTabNavigator();
function Tabs() { return <Tab.Navigator screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: '#0B6E4F', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name={(route.name === 'Dashboard' ? 'view-dashboard-outline' : route.name === 'Customers' ? 'account-group-outline' : 'clipboard-text-outline') as never} color={color} size={size} /> })}><Tab.Screen name="Dashboard" component={DashboardScreen}/><Tab.Screen name="Customers" component={CustomersScreen}/><Tab.Screen name="Bookings" component={BookingsScreen}/></Tab.Navigator>; }
export default function AppNavigator() { const dispatch = useDispatch<AppDispatch>(); const { session, restored } = useSelector((s: RootState) => s.auth); useEffect(() => { sessionStorage.get().then((saved) => { dispatch(setSession(saved)); dispatch(setRestored()); }).catch(() => { dispatch(setRestored()); }); return sessionEvents.onUnauthorized(() => dispatch(setSession(null))); }, [dispatch]); if (!restored) return <SplashScreen />; return <NavigationContainer><Stack.Navigator screenOptions={{ headerShadowVisible: false, headerStyle: { backgroundColor: '#F7F9F8' } }}>{session ? <><Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }}/><Stack.Screen name="CustomerForm" component={CustomerFormScreen} options={{ title: 'Customer' }}/><Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} options={{ title: 'Customer Details' }}/><Stack.Screen name="BookingForm" component={BookingFormScreen} options={{ title: 'Create Booking', presentation: 'modal' }}/><Stack.Screen name="BookingDetails" component={BookingDetailsScreen} options={{ title: 'Booking Details' }}/></> : <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>}</Stack.Navigator></NavigationContainer>; }
