import { View, Text } from 'react-native'

const PokeAbout = ({ pokemon }) => {
  return (
    <View>
      <InfoRow label="Species" value={pokemon.species.name} />
      <InfoRow label="Height" value={`${pokemon.height * 10} cm.`} />
      <InfoRow label="Weight" value={`${pokemon.weight / 10} kg.`} />
      <InfoRow label="Abilities" value={pokemon.abilities.map(a => a.ability.name).join(', ')} />
    </View>
  )
}

export default PokeAbout

const InfoRow = ({ label, value }) => (
  <View className="flex-row items-start mb-5">
    <Text className="w-24 text-base text-gray-400 font-poppins-reg">{label}</Text>
    <Text className='mr-4'>:</Text>
    <Text className="flex-1 text-base text-gray-700 capitalize font-poppins-semibold text-wrap">
      {value}
    </Text>
  </View>
);