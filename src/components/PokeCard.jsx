import { View, Text, TouchableOpacity, Image } from 'react-native';
import { PokemonColors } from "../constants/PokemonColors.js"
import { useRouter } from "expo-router";

const PokeCard = ({ pokemon }) => {
  const router = useRouter()

  const mainType = pokemon.types[0].type.name;
  const backgroundColor = PokemonColors[mainType] || "#A8A878";

  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: "/details", params: { id: pokemon.id } })}
      className='flex-1 m-2'
    >
      <View
        className="relative"
      >
        <View style={{ backgroundColor }} className="pt-2 pb-4 px-4 rounded-xl h-[100px] shadow-lg">
          <Text className='text-lg text-white capitalize font-poppins-semibold'>
            {pokemon.name}
          </Text>
          <View className='mt-2'>
            {pokemon.types.map((poke, index) => (
              <View
                key={index}
                className="px-3 py-1 mb-1 rounded-full bg-white/30 backdrop-blur-md w-[64px]"
              >
                <Text className="text-xs text-center text-white capitalize font-poppins-reg">
                  {poke.type.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Image source={{ uri: pokemon.sprites.other['official-artwork'].front_default }} className='absolute w-24 h-24 shadow-lg -bottom-2 -right-2' />

      </View>


    </TouchableOpacity>

  )
}

export default PokeCard