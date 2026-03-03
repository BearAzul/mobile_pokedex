import { View, Text } from 'react-native'

const PokeBaseStats = ({ pokemon, color }) => {
  return (
    <View>
      {pokemon.stats.map((s, index) => (
        <View key={index} className="flex-row items-center mb-4">
          <Text className="text-gray-400 capitalize w-36 font-poppins-reg">
            {s.stat.name}
          </Text>

          <Text className='mr-4'>:</Text>

          <Text className="text-center text-gray-700 font-poppins-semibold">
            {s.base_stat}
          </Text>

          <View className="flex-1 h-[6px] mx-2 overflow-hidden bg-gray-100 rounded-full">
            <View
              className="h-full rounded-full"
              style={{
                width: `${Math.min((s.base_stat / 150) * 100, 100)}%`,
                backgroundColor: color
              }}
            />
          </View>
        </View>
      ))}
    </View>
  )
}

export default PokeBaseStats