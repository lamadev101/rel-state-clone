import { View, Text, Image } from 'react-native'

import icons from '@/constants/icons'

const UserGreeting = ({ user }: any) => {
  return (
    <View className="flex flex-row items-center justify-between mt-5">
      <View className="flex flex-row">
        <Image
          source={{ uri: user?.avatar }}
          className="size-12 rounded-full"
        />

        <View className="flex flex-col items-start ml-2 justify-center">
          <Text className="text-xs font-rubik text-black-100">
            Good Morning
          </Text>
          <Text className="text-base font-rubik-medium text-black-300">
            {user?.name}
          </Text>
        </View>
      </View>
      <Image source={icons.bell} className="size-6" />
    </View>
  )
}

export default UserGreeting