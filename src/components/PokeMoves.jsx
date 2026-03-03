import { View, Text } from 'react-native'

const PokeMoves = ({ pokemon, color }) => {
  return (
    <View className="flex-row flex-wrap">
      {pokemon.moves.map((m, index) => (
        <View key={index} className="px-3 py-1.5 m-1 rounded-md shadow-lg" style={{backgroundColor: color}}>
          <Text className="text-white capitalize font-poppins-reg">{m.move.name}</Text>
        </View>
      ))}
    </View>
  )
}

export default PokeMoves