import { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, FlatList,View } from 'react-native'

import { useAppwrite } from '@/hooks/useAppwrite'
import { Card, FeaturedCard } from '@/components/Cards'
import { useGlobalContext } from '@/lib/global-provider'
import { getLatestProperties, getProperties } from '@/lib/appwrite'

import Search from '@/components/Search'
import SectionHeader from '@/components/SectionHeader'
import Filters from '@/components/Filters'
import NoResults from '@/components/NoResults'
import UserGreeting from '@/components/UserGreeting'



export default function Index() {
  const { user } = useGlobalContext()
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);


  return (
    <SafeAreaView className='h-full bg-white'>
      <FlatList
        data={properties}
        numColumns={2}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        contentContainerClassName={"pb-32"}
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => (
          <View className="px-5">
            <UserGreeting user={user} />
            <Search />

            <View className="my-5">
              <SectionHeader title='Featured' />
              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" className="text-primary-300" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5 mt-5"
                />
              )}
            </View>

            <View className="mt-5">
              <SectionHeader title='Our Recommendation' />
              <Filters />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}