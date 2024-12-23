import { View, Text, TouchableOpacity } from 'react-native'


interface Props {
  title: string;
  link?: string;
}
const SectionHeader = ({ title, link }: Props) => {
  return (
    <View className="flex flex-row items-center justify-between">
      <Text className="text-xl font-rubik-bold text-black-300">
        {title}
      </Text>
      <TouchableOpacity>
        <Text className="text-base font-rubik-bold text-primary-300">
          See all
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default SectionHeader