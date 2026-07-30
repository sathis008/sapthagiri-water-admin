import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { FAB, Searchbar, Card, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCustomersQuery } from '../services/api';
import type { Customer } from '../types';
import { Empty, ErrorState, Loading, StatusChip } from '../components';

export default function CustomersScreen({ navigation }: any) {
  const insets=useSafeAreaInsets(); const [search,setSearch]=useState(''); const [page,setPage]=useState(1); const [items,setItems]=useState<Customer[]>([]);
  const {data,isLoading,isFetching,isError,refetch}=useCustomersQuery({page,limit:15,search});
  useEffect(()=>{ if(!data) return; setItems(current=> data.pagination?.page === 1 ? data.data : [...current,...data.data.filter(next=>!current.some(old=>old._id===next._id))]); },[data]);
  const changeSearch=(value:string)=>{setSearch(value);setPage(1);setItems([])};
  const loadMore=()=>{const paging=data?.pagination;if(!isFetching&&paging&&paging.page<paging.totalPages)setPage(p=>p+1)};
  const refresh=()=>{setPage(1);setItems([]);refetch()};
  if(isLoading&&items.length===0)return <Loading/>; if(isError&&items.length===0)return <ErrorState onRetry={refetch}/>;
  return <View style={styles.page}><View style={{paddingTop:insets.top+10}}><Text variant="headlineSmall" style={styles.heading}>Customers</Text><Searchbar placeholder="Search customer or phone" value={search} onChangeText={changeSearch} style={styles.search}/></View><FlatList data={items} keyExtractor={x=>x._id} contentContainerStyle={{paddingBottom:92}} refreshControl={<RefreshControl refreshing={isFetching&&page===1} onRefresh={refresh}/>} onEndReached={loadMore} onEndReachedThreshold={0.5} ListEmptyComponent={<Empty title="No customers found"/>} ListFooterComponent={isFetching&&items.length?<View style={styles.loader}><ActivityIndicator color="#0B6E4F"/><Text variant="bodySmall">Loading customers…</Text></View>:null} renderItem={({item})=><Card style={styles.card} onPress={()=>navigation.navigate('CustomerDetails',{id:item._id})}><Card.Content style={styles.row}><View style={{flex:1}}><Text variant="titleMedium" style={{fontWeight:'700'}}>{item.name}</Text><Text variant="bodyMedium">{item.phone}</Text><Text variant="bodySmall" numberOfLines={1}>{item.address}</Text></View><StatusChip status={item.status}/></Card.Content></Card>}/><FAB icon="plus" color="#0B6E4F" size="medium" style={styles.fab} onPress={()=>navigation.navigate('CustomerForm')}/></View>;
}
const styles=StyleSheet.create({page:{flex:1,backgroundColor:'#F4F7F5'},heading:{fontWeight:'800',paddingHorizontal:16},search:{margin:12,borderRadius:14,backgroundColor:'#fff',borderWidth:1,borderColor:'#E2E8E4',elevation:0},card:{marginHorizontal:12,marginBottom:8,borderRadius:16},row:{flexDirection:'row',alignItems:'center',gap:12},fab:{position:'absolute',right:20,bottom:24,borderRadius:20,backgroundColor:'#fff',elevation:3},loader:{paddingVertical:20,alignItems:'center',gap:8}});
